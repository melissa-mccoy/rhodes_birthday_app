document.addEventListener('DOMContentLoaded', function(){
  if (!document.getElementById('map')) return;
  vendormap_view = new VendorMap.View(-6.17,106.8273, 12)
  vendormap_controller = new VendorMap.Controller(vendormap_view)
  vendormap_view.drawMap()
  vendormap_controller.populateMap()
  vendormap_controller.addAllEventListeners()
});
