VendorMap.View = function(startLat,startLong,startZoom) {
  this.map = new L.map('map')
  this.osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom: 2, maxZoom: 20, attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors '});
  this.initialMapCoords = new L.LatLng(startLat,startLong)
  this.initialZoom = startZoom
  this.searchNearbyButton = $('.search-button')
  this.myLocationButton = $('.my-location')
}

VendorMap.View.prototype = {

  setCurrentBounds: function(map) {
    console.log("inside setCurrentBounds")
    this.southWestBoundLat = this.map.getBounds()._southWest.lat
    this.southWestBoundLng = this.map.getBounds()._southWest.lng
    this.northEastBoundLat = this.map.getBounds()._northEast.lat
    this.northEastBoundLng = this.map.getBounds()._northEast.lng
  },

  drawMap: function(){
    console.log("got to draw Map")
    if (!this.map) return;
    var map = this.map.setView(this.initialMapCoords,this.initialZoom)
    map.addLayer(this.osm)

    this.displayContainer = document.createElement('div')
    this.displayContainer.classList.add('vendor-container')
    this.displayContainer.id = 'vendor-container'
    document.getElementById('map').appendChild(this.displayContainer)

    this.locationContainer = document.createElement('div')
    this.locationContainer.classList.add('location-container')
    this.locationContainer.id = 'location-container'
    document.getElementById('map').appendChild(this.locationContainer)
  },

  renderMarkers: function(vendorList){
    console.log("got to renderMarkers")
    console.log(vendorList)
    var markers = new L.MarkerClusterGroup()
    for (i=0; i<vendorList.length; i++){
      var marker = L.marker([vendorList[i].latitude,vendorList[i].longitude])
      var content = this.formatDiv(vendorList[i],'vendor-popup')
      this.bindThisPopup(marker,content)
      markers.addLayer(marker)
    }
    this.map.addLayer(markers)
  },

  renderStats: function(vendorCount){
    console.log("got to renderStats")
    var newDiv = document.createElement('div')
    newDiv.classList.add('vendor-stats')
    newDiv.innerText = "AtmaGo Water Vendor Map"
    document.getElementById('map').appendChild(newDiv)
  },

  renderDisplay: function(displayList) {
    console.log("got to renderDisplay")
    console.log(displayList)
    while(this.displayContainer.hasChildNodes()){
      this.displayContainer.removeChild(this.displayContainer.lastChild);
    }
    console.log(displayList)

    if(displayList.length < 4) {var displayNum = displayList.length }
    else {var displayNum = 4}

    for(i=0;i<displayNum;i++) {
      var temp = document.createElement('DIV')
      temp.innerHTML = this.formatDiv(displayList[i],'vendor-display')
      newDiv = temp.firstChild
      document.getElementById('vendor-container').appendChild(newDiv)
    }
  },

  // renderSearchOptions: function(location_array) {
  //   console.log("got to renderSearchOptions")
  //   console.log(location_array)

  //   if(location_array.length < 4) {var locationNum = location_array.length }
  //   else {var locationNum = 4}

  //   for(i=0;i<locationNum;i++) {
  //     var temp = document.createElement('DIV')
  //     temp.innerHTML = this.formatDiv(displayList[i],'location-display')
  //     newDiv = temp.firstChild
  //     document.getElementById('location-container').appendChild(newDiv)
  //   }
  // },

  bindThisPopup: function(marker, content){
    marker.on('mouseover', function(evt){
      evt.target.bindPopup(content).openPopup()
    })
  },

  formatDiv: function(vendor,type){
    var thisVendor = {
      "name": vendor.name,
      "price": "Rp "+vendor.price+"/L",
      "address": [
        {"addr": vendor.city},
        {"addr": vendor.country},
        {"addr": vendor.postalcode}
      ]
    }

    var vendorNameTemplate = "<div class='vendor-name'>{{name}}</div>";
    var vendorNameHtml = Mustache.to_html(vendorNameTemplate, thisVendor);

    var vendorPriceTemplate = "<div class='vendor-price'>{{price}}</div>";
    var vendorPriceHtml = Mustache.to_html(vendorPriceTemplate, thisVendor);

    var addressList = "<ul class='address'>{{#address}}<li class='address-part'>{{addr}}</li>{{/address}}</ul>";
    var vendorAddressHtml = Mustache.to_html(addressList, thisVendor);
    console.log(vendorAddressHtml)

    var vendorPopupContent = [
                    "<div class='"+type+"'>",
                    vendorNameHtml,
                    vendorPriceHtml,
                    vendorAddressHtml,
                    vendor.telephone,
                    "</div>"
                  ]

    console.log(vendorPopupContent.join(""))
    return vendorPopupContent.join("")
  }

}


