export default /*@ngInject*/ class googleMapsService {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.map = null;
    this.lastPosition = {lat: -25.363, lng: 131.044};
    this.infoWindow = null;
    this.markers = [];
    this.lineCoords = [];
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
      this.map = new google.maps.Map(element, {
       zoom: 4,
       center: this.lastPosition
      });
      // this.trackLocation(); //uncomment to track your location
    }, 1000);
  }

  addMarker(position, title) {
    let marker = new google.maps.Marker({
       position: this.lastPosition,
       map: this.map,
       title: title
    });
    this.markers.push(marker);
  }

  trackLocation() {
    this.infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lastPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.infoWindow.setPosition(this.lastPosition);
        this.infoWindow.setContent('Location found.');
        this.infoWindow.open(this.map);
        this.map.setCenter(this.lastPosition);
      }, () => {
        this.handleLocationError(true, this.infoWindow, this.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, map.getCenter());
    }
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent(browserHasGeolocation ?
                          'Needs permission to show your location' :
                          'No location support found');
    this.infoWindow.open(this.map);
  }

  mapLineDraw(position) {
    this.map.setCenter(position);
    mark.setPosition(position);
    this.lineCoords.push(new google.maps.LatLng(position.lat, position.lng));
    const lineCoordinatesPath = new google.maps.Polyline(
      {
        path: lineCoords,
        geodesic: true,
        strokeColor: '#2E10FF'
      }
    );

    lineCoordinatesPath.setMap(this.map);
  }
}
