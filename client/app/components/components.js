import Home from './home/home.module';
import About from './about/about.module';

export default angular.module('app.components', [Home, About])
  .name;
