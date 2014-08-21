document.addEventListener('DOMContentLoaded', function(){
  if (!document.getElementById('map')) return;
  vendormap_controller = new VendorMap.Controller()
  vendormap_view = new VendorMap.View(vendormap_controller)
  vendormap_controller.view = vendormap_view
  vendormap_controller.fetchUsers()
  vendormap_controller.initializeMap(-6.17,106.8273, 12)
  vendormap_view.drawMap(-6.17,106.8273, 12)
});
