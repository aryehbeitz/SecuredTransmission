export default /*@ngInject*/ class ChatBoxController {
  constructor($http, socketsService) {
    this.socketsService = socketsService;
  }

  $onInit() {
    this.socketsService.doConnect();
  }

  sendMessage(message) {
    this.socketsService.send(message);
    this.item = '';
  }

  reconnect() {
    this.socketsService.reconnect();
  }

  disconnect() {
    this.socketsService.close();
  }
}
