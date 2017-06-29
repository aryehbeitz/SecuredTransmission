import uiRouter from '@uirouter/angularjs';
import chatBoxComponent from './chatBox.component';
import chatBoxService from './chatBox.service';

export default angular.module('chatBox', [uiRouter])
  .component('chatBoxComponent', chatBoxComponent)
  .service('chatBoxService', chatBoxService)
  .name;
