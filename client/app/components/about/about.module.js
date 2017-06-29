import aboutComponent from './about.component';

export default angular.module('about', [])
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
