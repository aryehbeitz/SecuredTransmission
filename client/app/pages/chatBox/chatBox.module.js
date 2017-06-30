import uiRouter from '@uirouter/angularjs';
import chatBoxComponent from './chatBox.component';
import chatBoxService from './chatBox.service';

export default /*@ngInject*/ angular.module('chatBox', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider
      .state('chat_box', {
        url: '/chat_box',
        component: 'chatBox'
      });
  })
  .component('chatBox', chatBoxComponent)
  .service('chatBoxService', chatBoxService)
  .name;
