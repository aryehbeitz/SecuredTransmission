export default /*@ngInject*/ class utilsService {
  constructor() {
  }

  isJSON(jsonString){
    try {
        var o = JSON.parse(jsonString);
        return o && typeof o === "object";
    }
    catch (e) { }

    return false;
  }
}
