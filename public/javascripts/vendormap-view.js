VendorMap.View = function(startLat,startLong,startZoom) {
  this.map = new L.map('map')
  this.osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom: 2, maxZoom: 20, attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors '});
  this.initialMapCoords = new L.LatLng(startLat,startLong)
  this.initialZoom = startZoom
}

VendorMap.View.prototype = {

  drawMap: function(){
    console.log("got to draw Map")
    if (!this.map) return;
    var map = this.map.setView(this.initialMapCoords,this.initialZoom)
    map.addLayer(this.osm)
  },

  renderMarkers: function(vendorList){
    console.log("got to renderMarkers")
    console.log(vendorList)
    var markers = new L.MarkerClusterGroup()
    for (i=0; i<vendorList.length; i++){
      var marker = L.marker([vendorList[i].latitude,vendorList[i].longitude])
      var content = this.formatPopup(vendorList[i])
      this.bindThisPopup(marker,content)
      markers.addLayer(marker)
    }
    this.map.addLayer(markers)
  },

  renderStats: function(vendorCount){
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


