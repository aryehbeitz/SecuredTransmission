export default /*@ngInject*/ class googleMapsService {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.map = null;
    this.markers = [];
  }

  setMap(map) {
    this.map = map;
  }

  getMap() {
    return this.map;
  }

  isMap() {
    return this.map !== null;
  }

  createMap(element) {
    this.$timeout(() => {
      const uluru = {lat: -25.363, lng: 131.044};
      this.map = new google.maps.Map(element, {
       zoom: 4,
       center: uluru //take last position
      });
      this.addMarker(uluru, 'some title');
    }, 1000);
  }

  addMarker(position, title) {
    let marker = new google.maps.Marker({
       position: position,
       map: this.map,
       title: title
    });
    this.markers.push(marker);
  }
}
