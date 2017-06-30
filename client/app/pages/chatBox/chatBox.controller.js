export default /*@ngInject*/ class ChatBoxController {
  constructor($http, chatBoxService) {
    this.chatBoxService = chatBoxService;
    this.$http = $http;
    this.name = 'about';
    console.log(this.chatBoxService.name)
  }
  send(item) {
    alert(item);
  }
}
