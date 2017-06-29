import heroComponent from './hero.component';

export default angular.module('hero', [])
  .component('hero', heroComponent)
  .name;
