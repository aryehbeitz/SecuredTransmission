export default /*@ngInject*/ class googleMapsService {
  constructor($timeout, $q) {
    this.$timeout = $timeout;
    this.$q = $q;
    this.map = null;
    this.lastPosition = {lat: -25.363, lng: 131.044};
    this.infoWindow = null;
    this.markers = [];
    this.lineCoords = [];
    this.path = [];
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
    if (this.isMap()) return this.$q.defer();
    return this.$timeout(() => {
      this.map = new google.maps.Map(element, {
        zoom: 16,
        center: this.lastPosition,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    }, 1000);
  }

  addMarker(position, title) {
    let marker = new google.maps.Marker({
       position: position || this.lastPosition,
       map: this.map,
       title: title || ''
    });
    this.markers.push(marker);
  }

  trackLocation(element) {

    this.infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition((position) => {
      navigator.geolocation.watchPosition((position) => {
        this.lastPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.path.push(this.lastPosition);

        this.createMap(element)
        .then(() => {
          debugger;
          // Create the array that will be used to fit the view to the points range and
          // place the markers to the polyline's points
          var latLngBounds = new google.maps.LatLngBounds();
          for (var i = 0; i < this.path.length; i++) {
              latLngBounds.extend(this.path[i]);
              // Place the marker
              new google.maps.Marker({
                  map: this.map,
                  position: this.path[i],
                  title: "Point " + (i + 1)
              });
          }
          // Creates the polyline object
          var polyline = new google.maps.Polyline({
              map: this.map,
              path: this.path,
              strokeColor: '#0000FF',
              strokeOpacity: 0.7,
              strokeWeight: 1
          });
          // Fit the bounds of the generated points
          this.map.fitBounds(latLngBounds);



          this.infoWindow.setPosition(this.lastPosition);
          this.infoWindow.setContent('Location found.');
          this.infoWindow.open(this.map);
          this.map.setCenter(this.lastPosition);
          console.log(this.lastPosition);
        });
      }, () => {
        this.handleLocationError(true, this.infoWindow, this.map.getCenter());
      }, {
        enableHighAccuracy: true,
        timeout: 10 * 1000 // 10 seconds
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

  getLastLocation() {
    return this.lastPosition;
  }
}
