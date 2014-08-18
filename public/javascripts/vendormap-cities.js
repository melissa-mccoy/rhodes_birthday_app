//It seems like this is creating a list of unique lat/log rather than cities...
//If so, is it that common that a boot/vendor would have exactly the same lat/log?

VendorMap.City = function(name,latitude,longitude){
  this.name = name
  this.latitude = latitude
  this.longitude = longitude
  this.vendors = []
}

VendorMap.City.prototype = {
  addVendor: function(vendor){
    this.vendors.push(vendor)
  },

  cityVendorPopulation: function(){
    return this.vendors.length
  }
}

VendorMap.CityList = function(){
  this.uniqueCities = []
  this.cityLatitudes = []
}

VendorMap.CityList.prototype = {
  populateUniqueCities: function(vendorList){
    for(i=0; i<vendorList.length; i++){
      var thisVendor = vendorList[i]
      if(this.checkForCity(thisVendor.latitude) < 0){
        this.addToNewCity(thisVendor)
      } else {
        this.addToExistingCity(thisVendor)
      }
    }
  },

  checkForCity: function(cityLat){
    return this.cityLatitudes.indexOf(cityLat)
  },

  addToNewCity: function(thisVendor){
    newCity = new VendorMap.City(thisVendor.current_location, thisVendor.latitude, thisVendor.longitude)
    newCity.addVendor(thisVendor)
    this.uniqueCities.push(newCity)
    this.cityLatitudes.push(newCity.latitude)
  },

  addToExistingCity: function(thisVendor){
   for(c=0; c<this.uniqueCities.length; c++){
    thisCity = this.uniqueCities[c]
    if(thisCity.latitude === thisVendor.latitude){
      thisCity.addVendor(thisVendor)
    }
  }
}

}
