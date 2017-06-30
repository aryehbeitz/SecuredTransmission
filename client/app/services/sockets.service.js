export default /*@ngInject*/ class socketsService {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.host = 'ws://hondor.co.il:9000';
    this.socket = null;
    this.logData = [];
    this.isConnected = false;
  }
  doConnect() {
    try {
      this.socket = new WebSocket(this.host);
      this.$timeout(() => {
        this.log('WebSocket - status '+this.socket.readyState);
      });

      this.socket.onopen = this.handleOpen.bind(this);
      this.socket.onmessage = this.handleReceive.bind(this);
      this.socket.onclose = this.handleClose.bind(this);
    }
    catch(ex){ 
      this.log(ex); 
    }
  }

  log(data) {
    this.$timeout(() => {
      this.logData.push(data);
    });
  }

  getLog() {
    return this.logData;
  }

  send(msg) {
    try { 
      this.socket.send(msg); 
      this.log('Sent: '+msg); 
    } catch(ex) { 
      this.log(ex); 
    }
  }

  close() {
    if (this.socket != null) {
      this.log("Goodbye!");
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
      this.log("Connection Opened");
    });
  }

  handleReceive(msg) {
    this.$timeout(() => {
      this.log("Received: " + msg.data);
    });
  }

  handleClose(msg) {
    this.$timeout(() => {
      this.log("Close Connection");
    });
  }
}
