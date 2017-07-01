import Sockets from './sockets/sockets.service';
import GoogleMaps from './googleMaps/googleMaps.service';
import LocalStorage from './localStorage/localStorage.service';
import Utils from './utils/utils.service';

export default angular.module('app.services', [])
  .service('socketsService', Sockets)
  .service('googleMapsService', GoogleMaps)
  .service('localStorageService', LocalStorage)
  .service('utilsService', Utils)
  .name;
