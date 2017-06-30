import Sockets from './sockets.service';

export default angular.module('app.services', [])
  .service('socketsService', Sockets)
  .name;
