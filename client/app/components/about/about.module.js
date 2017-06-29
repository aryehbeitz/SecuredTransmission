import uiRouter from '@uirouter/angularjs';
import aboutComponent from './about.component';

export default angular.module('about', [uiRouter])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('about', {
        url: '/about',
        component: 'about'
      });
  })
  .component('about', aboutComponent)
  .name;
