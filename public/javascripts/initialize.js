document.addEventListener('DOMContentLoaded', function(){
  if (!document.getElementById('map')) return;
  vendormap_view = new VendorMap.View()
  vendormap_controller = new VendorMap.Controller(vendormap_view)
  vendormap_controller.renderMap(-6.17,106.8273, 12)
});
