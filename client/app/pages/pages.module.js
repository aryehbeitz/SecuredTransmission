import Home from './home/home.module';
import About from './about/about.module';
import chatBox from './chatBox/chatBox.module';

export default angular.module('app.pages', [Home, About, chatBox])
  .name;
