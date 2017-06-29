export default class chatBoxService {
  "ngInject";
  constructor($http) {
    this.$http = $http;
    console.log($http);
  }
}
