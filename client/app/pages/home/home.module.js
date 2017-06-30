import uiRouter from '@uirouter/angularjs';
import homeComponent from './home.component';

export default /*@ngInject*/ angular.module('home', [uiRouter])
  .config(($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        component: 'home'
      });
  })
  .component('home', homeComponent)
  .name;
