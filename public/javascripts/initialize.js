document.addEventListener('DOMContentLoaded', function(){
  if (!document.getElementById('map')) return;
  vendormap_controller = new VendorMap.Controller() //why no ()?
  vendormap_view = new VendorMap.View(vendormap_controller)
  vendormap_controller.view = vendormap_view
  vendormap_controller.fetchUsers()
  vendormap_controller.initializeMap(37.769, -5, 2)
  vendormap_view.drawMap()
});
