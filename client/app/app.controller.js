export default /*@ngInject*/ class AppController {
  constructor($state, $timeout, googleMapsService) {
    this.$state = $state;
    this.$timeout = $timeout;
    this.googleMapsService = googleMapsService;
  }

  $onInit() {
    // if (!this.googleMapsService.isMap()) {
    //   this.$timeout(() => {
    //     const uluru = {lat: -25.363, lng: 131.044};
    //     let map = new google.maps.Map(document.getElementById('map'), {
    //      zoom: 4,
    //      center: uluru //take last position
    //     });
    //     var marker = new google.maps.Marker({
    //      position: uluru,
    //      map: map,
    //      title: 'some marker title'
    //     });
    //   }, 1000);
    // }
    // if (!this.googleMapsService.isMap()) {
    //   this.googleMapsService.createMap();
    // }
  }
}
