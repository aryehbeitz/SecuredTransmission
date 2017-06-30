import uiRouter from '@uirouter/angularjs';
import aboutComponent from './about.component';

export default /*@ngInject*/ angular.module('about', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider
      .state('about', {
        url: '/about',
        component: 'about'
      });
  })
  .component('about', aboutComponent)
  .name;
