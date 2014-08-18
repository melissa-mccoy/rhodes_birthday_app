VendorMap.View = function(controller) {
  this.controller = controller
}

//Only renderMarkers and renderStats are called by the controller - other methods are used by these 2 methods
VendorMap.View.prototype = {
  //Called by initialize.js
  drawMap: function(){
    var controller = this.controller
    var thisMap = controller.map
    if (!thisMap) return;
    var map = thisMap.setView(controller.initialMapCoords,controller.initialZoom) // setView is a Leaflet function
    map.addLayer(controller.osm) // addLayer is a Leaflet function
  },

  //Called by vendormap-controller.js
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
  renderStats: function(cityCount){ //creates the circles/pinpoints
    console.log("got to renderStats")
    var newDiv = document.createElement('div')
    newDiv.classList.add('vendor-stats')
    newDiv.innerText = this.setStatDivText(cityCount)
    document.getElementById('map').appendChild(newDiv)
  },

  setStatDivText: function(cityCount){
    console.log("got to setStatDivText")
    var divText = "VendorMap: find water vendors in " + cityCount + "Indonesian areas"
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
      name: vendor.name,
      price: vendor.price/vendor.quantity,
      // address: [
      //   {vendor.rt},
      //   {vendor.rw},
      //   {vendor.city},
      // ]
      // socialLinks: [
      //   { url: vendor.github_profile_link,     icon: 'fa fa-github fa-lg'},
      //   { url: vendor.twitter_profile_link,    icon: 'fa fa-twitter fa-lg'},
      //   { url: vendor.facebook_profile_link,   icon: 'fa fa-facebook fa-lg'},
      //   { url: vendor.linked_in_profile_link,  icon: 'fa fa-linkedin fa-lg'},
      //   { url: vendor.blog_link,               icon: 'fa fa-tumblr fa-lg'}
      //   ]
    }

    var vendorNameTemplate = "<div class='vendor-name'>{{name}}</div>";
    var vendorNameHtml = Mustache.to_html(vendorNameTemplate, thisVendor);

    var vendorPriceTemplate = "<div class='vendor-name'>{{price}}</div>";
    var vendorPriceHtml = Mustache.to_html(vendorPriceTemplate, thisVendor);

    // var addressList = "<ul class='social-media'>{{#addressParts}}<li class='social-link'></li>{{/addressParts}}</ul>";
    // var vendorAddressHtml = Mustache.to_html(addressList, thisVendor);

    // var socialMedia = "<ul class='social-media'>{{#socialLinks}}<li class='social-link'><a href='{{url}}' target='_blank'><i i class='{{icon}}'></i></a></li>{{/socialLinks}}</ul>";
    // var vendorSocialMediaHtml = Mustache.to_html(socialMedia, thisVendor);

    var vendorPopupContent = [
                    "<div class='user-popup'>",
                    vendorNameHtml,
                    // vendorSocialMediaHtml,
                    vendorPriceHtml,
                    vendor.rt,
                    vendor.rw,
                    vendor.city,
                    // vendorAddressHtml,
                    vendor.note,
                    vendor.current_location,
                    "</div>"
                  ]
    return vendorPopupContent.join("")
  }

}


