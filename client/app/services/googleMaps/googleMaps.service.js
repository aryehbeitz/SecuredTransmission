export default /*@ngInject*/ class googleMapsService {
  constructor($timeout, $interval, $q) {
    this.$timeout = $timeout;
    this.$interval = $interval;
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
    if (this.isMap()) {
     return;
    };
    this.$timeout(() => {
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
    let tmpPos = {};
    this.$interval(() => {
      this.infoWindow = new google.maps.InfoWindow;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          tmpPos = {lat: (tmpPos.lat || position.coords.latitude) - Math.random()/1000, lng: (tmpPos.lon || position.coords.longitude) + Math.random()/1000};
          tmpPos = {lat: position.coords.latitude, lng: position.coords.longitude};
          // tmpPos.lat += 0.001;
          if (this.lastPosition.lat === position.lat && this.lastPosition.latlng === position.lng) return false;
        // navigator.geolocation.watchPosition((position) => {
          this.lastPosition = {
            lat: tmpPos.lat,
            lng: tmpPos.lng
          };
          this.path.push(this.lastPosition);

          this.createMap(element);
          // Create the array that will be used to fit the view to the points range and
          // place the markers to the polyline's points
          var latLngBounds = new google.maps.LatLngBounds();
          for (var i = 0; i < this.path.length; i++) {
              latLngBounds.extend(this.path[i]);
              // Place the marker
              // new google.maps.Marker({
              //     map: this.map,
              //     position: this.path[i],
              //     title: "Point " + (i + 1)
              // });
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
          // this.map.fitBounds(latLngBounds);



          // this.infoWindow.setPosition(this.lastPosition);
          // this.infoWindow.setContent('Location found.');
          this.infoWindow.open(this.map);
          // console.log( )
          this.lastPosition.lat = this.map.getCenter().lat();
          this.lastPosition.lng = this.map.getCenter().lng();
          // debugger;

          // this.map.setCenter(this.lastPosition);
          console.log(this.lastPosition);
          console.log(...this.path);
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
    }, 1000);

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
