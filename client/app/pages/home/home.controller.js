export default /*@ngInject*/ class HomeController {
  constructor(soundRecordingService, utilsService) {
    this.soundRecordingService = soundRecordingService;
    this.utilsService = utilsService;
    this.num = 0;
  }
  plus() {
    this.num +=1;
  }
}
