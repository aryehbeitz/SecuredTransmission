export default /*@ngInject*/ class ChatBoxController {
  constructor($http, socketsService) {
    this.socketsService = socketsService;
  }

  $onInit() {
    if (!this.socketsService.isConnected()) {
      this.socketsService.doConnect();
    }
  }

  sendMessage(message) {
    const message_data = {
      type: 'text_message',
      data: message
    };
    this.socketsService.send(JSON.stringify(message_data));
    this.item = '';
  }

  reconnect() {
    this.socketsService.reconnect();
  }

  disconnect() {
    this.socketsService.close();
  }
}
