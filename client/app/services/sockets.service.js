export default /*@ngInject*/ class socketsService {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.host = 'ws://hondor.co.il:9000';
    this.socket = null;
    this.logData = [];
    this.init();
  }

  init() {
    this.socket = new WebSocket(this.host);
    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleReceive.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onerror = this.handleError.bind(this);
  }

  isConnected() {
    return this.socket.readyState === 1;
  }

  doConnect() {
    if (!this.socket) {
      this.init();
    }
  }

  log(data) {
    this.logData.push(data.data);
  }

  getLog() {
    return this.logData;
  }

  send(msg) {
    if (!this.isConnected()) {
      this.reconnect();
      this.$timeout(() => {
        this.socket.send(msg); 
        this.log({data: 'Sent: '+JSON.parse(msg).data}); 
      },1000);
    } else {
      this.socket.send(msg); 
      this.log({data: 'Sent: '+JSON.parse(msg).data}); 
    }
  }

  close() {
    if (this.socket != null) {
      this.socket.close();
      this.socket=null;
    }
  }

  reconnect() {
    this.close();
    this.doConnect();
  }

  handleOpen(msg) {
    this.$timeout(() => {
      this.log({data: "Connection Opened"});
      this.log({data: 'WebSocket - status '+this.socket.readyState});
    });
  }

  handleReceive(msg) {
    this.$timeout(() => {
      this.log({data: "Received: " + JSON.parse(msg.data).data});
    });
  }

  handleClose() {
    this.doConnect();
  }

  handleError() {
    this.doConnect();
  }
}
