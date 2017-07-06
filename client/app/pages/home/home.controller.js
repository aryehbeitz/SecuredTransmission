export default /*@ngInject*/ class HomeController {
  constructor(soundRecordingService) {
    this.soundRecordingService = soundRecordingService;
    this.num = 0;
  }
  plus() {
    this.num +=1;
  }
}
