import Sockets from './sockets.service';
import GoogleMaps from './googleMaps.service';

export default angular.module('app.services', [])
  .service('socketsService', Sockets)
  .service('googleMapsService', GoogleMaps)
  .name;
