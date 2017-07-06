import Sockets from './sockets/sockets.service';
import GoogleMaps from './googleMaps/googleMaps.service';
import LocalStorage from './localStorage/localStorage.service';
import SoundRecording from './soundRecording/soundRecording.service';
import Utils from './utils/utils.service';

export default angular.module('app.services', [])
  .service('socketsService', Sockets)
  .service('googleMapsService', GoogleMaps)
  .service('localStorageService', LocalStorage)
  .service('soundRecordingService', SoundRecording)
  .service('utilsService', Utils)
  .name;
