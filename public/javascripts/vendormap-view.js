VendorMap.View = function(controller) {
  this.controller = controller
}

//Only renderMarkers and renderStats are called by the controller - other methods are used by these 2 methods
VendorMap.View.prototype = {
  //Called by initialize.js
  drawMap: function(initialLatitude,initialLongitude,initialZoom){
    var thisMap = this.controller.map
    if (!thisMap) return;
    var map = thisMap.setView([initialLatitude,initialLongitude],initialZoom) // setView is a Leaflet function
    map.addLayer(this.controller.osm) // addLayer is a Leaflet function
  },

  //Called by vendormap-this.controller.js
  renderMarkers: function(vendorList, map){ //creates the info boxes for the circles/pinpoints
    console.log("got to renderMarkers")
    console.log(vendorList)
    var map = map //sets fed map to map
    var markers = new L.MarkerClusterGroup() //creates Leaflet markers collection object
    for (i=0; i<vendorList.length; i++){ //for each vendor JS object in the vendorList
        var lat=vendorList[i].latitude
        var long=vendorList[i].longitude
        var marker = L.marker([lat,long]) //creates a Leaflet marker object with the given vendors lat and long
        var content = this.formatPopup(vendorList[i]) //creates content object using custom formatPopup function(see below) that accepts vendor JS object
        this.bindThisPopup(marker,content) //binds the content object to the Leaflet market object with Leaflet-defined method (see below)
        markers.addLayer(marker) // adds marker to markers collection
    }
    map.addLayer(markers)
  },

  //Called by vendormap-controller.js
  renderStats: function(vendorCount){ //creates the circles/pinpoints
    console.log("got to renderStats")
    var newDiv = document.createElement('div')
    newDiv.classList.add('vendor-stats')
    newDiv.innerText = this.setStatDivText(vendorCount)
    document.getElementById('map').appendChild(newDiv)
  },

  setStatDivText: function(vendorCount){
    console.log("got to setStatDivText")
    var divText = "AtmaGo Water Vendor Map: Search through over "+ vendorCount + " water vendors in Indonesia"
    return divText
  },

  //bindPopup and openPopup are leaflet fns
  bindThisPopup: function(marker, content){
    marker.on('mouseover', function(evt){
      evt.target.bindPopup(content).openPopup()
    })
  },

  formatPopup: function(vendor){
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
                    "<div class='user-popup'>",
                    vendorNameHtml,
                    vendorPriceHtml,
                    vendorAddressHtml,
                    vendor.telephone,
                    "</div>"
                  ]
    return vendorPopupContent.join("")
  }

}


