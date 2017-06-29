import uiRouter from '@uirouter/angularjs';
import navbarComponent from './navbar.component';

export default angular.module('navbar', [uiRouter])
  .component('navbar', navbarComponent)
  .name;
