VendorMap.Controller = function(view){
  this.view = view
  this.vendorList = []
  this.areaList = new VendorMap.AreaList()
}

VendorMap.Controller.prototype = {

  populateMap: function(){
    $.ajax({
      url: '/vendors',
      type: 'GET',
    }).done(function(data){
      console.log("success!")
      var vendorJsonObjectsCollection = JSON.parse(data)
      this.populateVendorListFromJSON(vendorJsonObjectsCollection)
      this.areaList.populateUniqueAreas(this.vendorList)
      this.renderView()
    }.bind(this)).fail(function() {
      console.log("failboat!")
    })
  },

  renderView: function(vendorList){
    console.log("got to renderView")
    this.view.renderMarkers(this.vendorList)
    this.view.renderStats(this.vendorList.length)
  },

  populateVendorListFromJSON: function(vendorJsonObjectsCollection){
    console.log(vendorJsonObjectsCollection.length)
    for(var i=0; i<vendorJsonObjectsCollection.length; i++){
      console.log("inside for loop")
      var vendorJsonObject = vendorJsonObjectsCollection[i]
      if(vendorJsonObject.latitude && vendorJsonObject.longitude){
        console.log("found vendor with lat and long")
        vendorJSObject = new VendorMap.Vendor(vendorJsonObject)
        this.vendorList.push(vendorJSObject)
      }
    }
  }
}





