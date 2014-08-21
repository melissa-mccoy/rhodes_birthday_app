//It seems like this is creating a list of unique lat/log rather than cities...
//If so, is it that common that a boot/vendor would have exactly the same lat/log?
//Logic
//1. Checks if a vendor's lat/log is "the same" as another vendor's lat/log and if so, clusters them. Integer division is used so "sameness" is relative to the granularity at which the user is looking (ie the zoom they're in.)
//2. This logic is run every time that the user zooms and thus eventually, you get to a point where there are no more clusters.

VendorMap.Area = function(name,latitude,longitude){
  this.name = name
  this.latitude = latitude
  this.longitude = longitude
  this.vendors = []
}

VendorMap.Area.prototype = {
  addVendor: function(vendor){
    this.vendors.push(vendor)
  },

  areaVendorPopulation: function(){
    return this.vendors.length
  }
}

VendorMap.AreaList = function(){
  this.uniqueAreas = []
  this.areaLatitudes = []
}

VendorMap.AreaList.prototype = {
  populateUniqueAreas: function(vendorList){
    for(i=0; i<vendorList.length; i++){
      var thisVendor = vendorList[i]
      if(this.checkForArea(thisVendor.latitude) < 0){
        this.addToNewArea(thisVendor)
      } else {
        this.addToExistingArea(thisVendor)
      }
    }
  },

  checkForArea: function(areaLat){
    return this.areaLatitudes.indexOf(areaLat)
  },

  addToNewArea: function(thisVendor){
    newArea = new VendorMap.Area(thisVendor.current_location, thisVendor.latitude, thisVendor.longitude)
    newArea.addVendor(thisVendor)
    this.uniqueAreas.push(newArea)
    this.areaLatitudes.push(newArea.latitude)
  },

  addToExistingArea: function(thisVendor){
   for(c=0; c<this.uniqueAreas.length; c++){
    thisArea = this.uniqueAreas[c]
    if(thisArea.latitude === thisVendor.latitude){
      thisArea.addVendor(thisVendor)
    }
  }
}

}
