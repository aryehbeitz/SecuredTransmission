export default /*@ngInject*/ class chatBoxService {
  constructor($http) {
    this.$http = $http;
    this.name = "service";
  }
}
