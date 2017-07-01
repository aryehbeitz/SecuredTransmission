export default /*@ngInject*/ class AboutController {
  constructor(googleMapsService) {
    this.googleMapsService = googleMapsService;
  }

  // $onInit() {
  //   if (!this.googleMapsService.isMap()) {
  //     this.googleMapsService.createMap();
  //   }
  // }
}
