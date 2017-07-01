export default /*@ngInject*/ class localStorageService {
  constructor() {
    this.storageData = localStorage.getItem('securedTransmission') || {};
  }

  load() {
    return localStorage.getItem('securedTransmission') || {};
  }

  set(key, value) {
    const dataString = this.load();
    const data = JSON.parse(dataString);
    data[key] = value;
    const outData = JSON.stringify(data);
    localStorage.setItem('securedTransmission', outData);
  }

  get(key) {
    const dataString = this.load();
    const data = JSON.parse(dataString);
    return data[key] || {};
  }
}
