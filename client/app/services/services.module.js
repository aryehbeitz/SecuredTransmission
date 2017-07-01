import Sockets from './sockets.service';
import GoogleMaps from './googleMaps.service';
import LocalStorage from './localStorage.service';

export default angular.module('app.services', [])
  .service('socketsService', Sockets)
  .service('googleMapsService', GoogleMaps)
  .service('localStorageService', LocalStorage)
  .name;
