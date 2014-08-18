//Constructor Function for VendorMap.Controller
VendorMap.Controller = function(){

}

//Add osmInitializer to VendorMap.Controller prototype
VendorMap.Controller.prototype = {

  osmInitializer: function(){
    var osm = {}
    return osm
  }
}

//Why create controller function twice? Consider removing
VendorMap.Controller = function(){
}

//Add several methods to VendorMap.Controller prototype
VendorMap.Controller.prototype = {
  //Add leaflets map - can use leaflets library because added Leaflets CSS and JS link in Layout.erb
  newMap: function(){
    if ($("#map").length < 1) return;
    var newMap = new L.map('map')
    this.map = newMap //creates a map attribute for the controller object instance
  },

  initializeMapData: function(startLat,startLong,startZoom){
    this.initialMapCoords = new L.LatLng(startLat,startLong)
    this.initialZoom = startZoom
  },

  initializeOSM: function(){
    var osmUrl    ='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib ='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors ';
    var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 10, attribution: osmAttrib});
    this.osm = osm
  },

  //Calls the above 3 methods so that initialize just calls this functino
  initializeMap: function(startLat,startLong,startZoom){
    this.newMap()
    this.initializeMapData(startLat,startLong,startZoom)
    this.initializeOSM()
  },

  //Makes AJAX request to get vendors data as array of JSON objects
  fetchUsers: function(){
    var controller = this;
    $.ajax({
      url: '/vendors',
      type: 'GET',
    }).done(function(data){ //data is an arrayof JSON objects that is returned from my Sinatra route get '/vendors' that queries my AR database
      console.log("success!")
      controller.facilitateMarkers(data) //Calls controller function that renders markers and stats in the view
    }).fail(function() {
      console.log("failboat!")
    })
  },

  facilitateMarkers: function(serverData){
    var controller = this //consider just using this
    var vendorList = controller.vendorListFromJSON(serverData)
    console.log("got to facilitateMarkers")
    controller.view.renderMarkers(vendorList, controller.map) //send vendor list and current map to the view
    controller.view.renderStats(controller.masterRoster.uniqueLocationsCount)
  },

  vendorListFromJSON: function(vendorData){
    var controller = this
    controller.masterRoster = new VendorMap.MasterRoster //object contains a vendorList array and a uniqueLocationsCount attribute
    var vendorList = controller.masterRoster.vendorList
    for(var i=0; i<vendorData.length; i++){ //loops through vendorData JSON objects array
      var thisVendor = vendorData[i] //grabs a JSON object in the array which is the hash of args needed to create a vendor object
      if(controller.validateLocation(thisVendor)){
        vendor = new VendorMap.Vendor(thisVendor) //creates Vendor JS object by feeding JSON object piece (array of args) to Vendor model constructor
        console.log("found vendor with lat and long")
        console.log(vendor)
        vendorList.push(vendor) //adds Vendor JS object to vendorList of master roster
      }
    }
    controller.generateUniqueLocations(vendorList) //create CityList that holds array of unique cities+their longitudes and also sets the uniquecity count for the master roster
    return vendorList
  },

  validateLocation: function(vendor){
    if(vendor.latitude && vendor.longitude){
      return true
    }
  },

  generateUniqueLocations: function(vendorList){
    var cityList = new VendorMap.CityList //Creates a CityList object that has uniqueCities and cityLatitudes arrays and several methods
    cityList.populateUniqueCities(vendorList) //Adds only unique cities to cityList
    this.masterRoster.uniqueLocationsCount = cityList.uniqueCities.length //Counts number of unique cities equal to the master roster unique location count
  }
}





