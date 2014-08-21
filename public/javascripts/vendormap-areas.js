//Explanation of Logic
//1. Checks if a vendor's lat/log is "the same" as another vendor's lat/log and if so, clusters them. Integer division is used so "sameness" is relative to the granularity at which the user is looking (ie the zoom they're in.)
//2. This logic is run every time that the user zooms and thus eventually, you get to a point where there are no more clusters.

VendorMap.Area = function(latitude,longitude){
  this.latitude = latitude
  this.longitude = longitude
  this.vendors = []
}

VendorMap.AreaList = function(){
  this.uniqueAreas = []
  this.areaLatitudes = []
}

VendorMap.AreaList.prototype = {
  populateUniqueAreas: function(vendorList){
    for(i=0; i<vendorList.length; i++){
      var thisVendor = vendorList[i]
      if(this.areaLatitudes.indexOf(thisVendor.latitude) < 0){
        newArea = this.createNewArea(thisVendor.latitude, thisVendor.longitude)
        newArea.vendors.push(thisVendor)
      } else {
        this.addVendorToExistingArea(thisVendor)
      }
    }
  },

  createNewArea: function(latitude,longitude) {
    newArea = new VendorMap.Area(latitude, longitude)
    this.uniqueAreas.push(newArea)
    this.areaLatitudes.push(newArea.latitude)
    return newArea
  },

  addVendorToExistingArea: function(thisVendor){
    for(c=0; c<this.uniqueAreas.length; c++){
      thisArea = this.uniqueAreas[c]
      if(thisArea.latitude === thisVendor.latitude){
        thisArea.vendors.push(thisVendor)
      }
    }
  }

}
