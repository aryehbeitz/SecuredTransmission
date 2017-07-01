export default /*@ngInject*/ class localStorageService {
  constructor() {
    this.storageData = window.localStorage.getItem('securedTransmission');
  }

  load() {
    return window.localStorage.getItem('securedTransmission') || null;
  }

  set(key, value) {
    const dataString = this.load();
    const data = JSON.parse(dataString);
    data[key] = value;
    const outData = JSON.stringify(data);
    window.localStorage.setItem('securedTransmission', outData);
  }

  get(key) {
    const dataString = this.load();
    const data = JSON.parse(dataString);
    return data[key];
  }

  isJSON(jsonString){
    try {
        var o = JSON.parse(jsonString);
        return o && typeof o === "object";
    }
    catch (e) { }

    return false;
};
}
