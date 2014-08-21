//Constructor Function for VendorMap.Controller
VendorMap.Controller = function(view){
  this.view = view
}

//Add several methods to VendorMap.Controller prototype
VendorMap.Controller.prototype = {
  renderMap: function(initialLatitute,initialLongitude,initialZoom) {
    this.fetchUsers()
    this.view.initializeMap(initialLatitute,initialLongitude,initialZoom)
    this.view.drawMap()
  },

  //Makes AJAX request to get vendors data as array of JSON objects
  fetchUsers: function(){
    $.ajax({
      url: '/vendors',
      type: 'GET',
    }).done(function(data){ //data is an arrayof JSON objects that is returned from my Sinatra route get '/vendors' that queries my AR database
      console.log("success!")
      // this.masterRoster = new VendorMap.MasterRoster
      // var vendorJ this.vendorListFromJSON(data)
      this.facilitateMarkers(data) //Calls controller function that renders markers and stats in the view
    }.bind(this)).fail(function() {
      console.log("failboat!")
    })
  },

  facilitateMarkers: function(serverData){
    var vendorList = this.vendorListFromJSON(serverData)
    console.log("got to facilitateMarkers")
    console.log(vendorList)
    this.view.renderMarkers(vendorList) //send vendor list and current map to the view
    this.view.renderStats(vendorList.length)
  },

  vendorListFromJSON: function(vendorData){
    this.masterRoster = new VendorMap.MasterRoster //object contains a vendorList array and a uniqueLocationsCount attribute
    var vendorList = this.masterRoster.vendorList
    vendorData = JSON.parse(vendorData)
    for(var i=0; i<vendorData.length; i++){ //loops through vendorData JSON objects array
      console.log("inside for loop")
      var thisVendor = vendorData[i] //grabs a JSON object in the array which is the hash of args needed to create a vendor object
      console.log(thisVendor)
      if(this.validateLocation(thisVendor)){
        vendor = new VendorMap.Vendor(thisVendor) //creates Vendor JS object by feeding JSON object piece (array of args) to Vendor model constructor
        console.log("found vendor with lat and long")
        console.log(vendor)
        vendorList.push(vendor) //adds Vendor JS object to vendorList of master roster
      }
    }
    this.generateUniqueLocations(vendorList) //create AreaList that holds array of unique cities+their longitudes and also sets the uniqueArea count for the master roster
    return vendorList
  },

  validateLocation: function(vendor){
    if(vendor.latitude && vendor.longitude){
      return true
    }
  },

  generateUniqueLocations: function(vendorList){
    var areaList = new VendorMap.AreaList() //Creates a AreaList object that has uniqueAreas and areaLatitudes arrays and several methods
    areaList.populateUniqueAreas(vendorList) //Adds only unique cities to areaList
    this.masterRoster.uniqueLocationsCount = areaList.uniqueAreas.length //Counts number of unique areas equal to the master roster unique location count
  }
}





