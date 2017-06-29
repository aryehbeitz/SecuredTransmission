import uiRouter from '@uirouter/angularjs';
import UserFactory from './user.factory';

export default angular.module('user', [uiRouter])
  .factory('User', UserFactory)
  .name;
