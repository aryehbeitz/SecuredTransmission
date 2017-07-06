//http://typedarray.org/wp-content/projects/WebAudioRecorder/  
export default /*@ngInject*/ class localStorageService {
  constructor() {
    this.storageData = window.localStorage.getItem('securedTransmission');
  }

  startRecording() {
    // variables

    this.leftchannel = [];
    this.rightchannel = [];
    this.recorder = null;
    this.recording = !1;
    this.recordingLength = 0;
    this.volume = null;
    this.audioInput = null;
    this.sampleRate = 44100;
    this.audioContext = null;
    this.context = null;
    this.outputElement = {};
    this.outputString;

    this.recording = true;
    // reset the buffers for the new recording
    this.leftchannel.length = this.rightchannel.length = 0;
    this.recordingLength = 0;
    console.log('Recording now...');
    // if S is pressed, we stop the recording and package the WAV file
    
    // feature detection 
    if (!navigator.getUserMedia)
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: true
      }, this.success.bind(this), (e) => {
        console.log(e);
        console.log('Error capturing audio.');
      });
    } else console.log('getUserMedia not supported in this browser.');
    // end startRecording()
  }



  stopRecording(callBack) {

      // we stop recording
      this.recording = false;

      this.outputElement.innerHTML = 'Building wav file...';

      // we flat the left and right channels down
      var leftBuffer = this.mergeBuffers(this.leftchannel, this.recordingLength);
      var rightBuffer = this.mergeBuffers(this.rightchannel, this.recordingLength);
      // we interleave both channels together
      var interleaved = this.interleave(leftBuffer, rightBuffer);

      // we create our wav file
      var buffer = new ArrayBuffer(44 + interleaved.length * 2);
      var view = new DataView(buffer);

      // RIFF chunk descriptor
      this.writeUTFBytes(view, 0, 'RIFF');
      view.setUint32(4, 44 + interleaved.length * 2, true);
      this.writeUTFBytes(view, 8, 'WAVE');
      // FMT sub-chunk
      this.writeUTFBytes(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      // stereo (2 channels)
      view.setUint16(22, 2, true);
      view.setUint32(24, this.sampleRate, true);
      view.setUint32(28, this.sampleRate * 4, true);
      view.setUint16(32, 4, true);
      view.setUint16(34, 16, true);
      // data sub-chunk
      this.writeUTFBytes(view, 36, 'data');
      view.setUint32(40, interleaved.length * 2, true);

      // write the PCM samples
      var lng = interleaved.length;
      var index = 44;
      var volume = 1;
      for (var i = 0; i < lng; i++) {
        view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
        index += 2;
      }
      console.log(view)
      // our final binary blob
      var blob = new Blob([view], {
        type: 'audio/wav'
      });

      // let's save it locally
      console.log('Handing off the file now...');
      var url = (window.URL || window.webkitURL).createObjectURL(blob);

      // callBack(url);
      console.log(url);
      console.log(blob);
      var reader = new FileReader();
     
      console.log(reader.readAsArrayBuffer(blob));
       var buf = new Buffer(blob, 'base64');
       console.log(buf)


    } //end stopRecording()

  interleave(leftChannel, rightChannel) {
    var length = leftChannel.length + rightChannel.length;
    var result = new Float32Array(length);

    var inputIndex = 0;

    for (var index = 0; index < length;) {
      result[index++] = leftChannel[inputIndex];
      result[index++] = rightChannel[inputIndex];
      inputIndex++;
    }
    return result;
  }

  mergeBuffers(channelBuffer, recordingLength) {
    var result = new Float32Array(recordingLength);
    var offset = 0;
    var lng = channelBuffer.length;
    for (var i = 0; i < lng; i++) {
      var buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  }

  writeUTFBytes(view, offset, string) {
    var lng = string.length;
    for (var i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  success(e) {
    // creates the audio context
    if (window.AudioContext)
      this.context = new window.AudioContext;
    else
      this.context = new window.webkitAudioContext;
    // this.audioContext = window.AudioContext || window.webkitAudioContext;
    // this.context = new this.audioContext();

    console.log('succcess');

    // creates a gain node
    this.volume = this.context.createGain();

    // creates an audio node from the microphone incoming stream
    this.audioInput = this.context.createMediaStreamSource(e);

    // connect the stream to the gain node
    this.audioInput.connect(this.volume);

    /* From the spec: This value controls how frequently the audioprocess event is 
    dispatched and how many sample-frames need to be processed each call. 
    Lower values for buffer size will result in a lower (better) latency. 
    Higher values will be necessary to avoid audio breakup and glitches */
    var bufferSize = 2048;
    this.recorder = this.context.createScriptProcessor(bufferSize, 2, 2);

    this.recorder.onaudioprocess = function(e) {
      if (!this.recording) return;
      var left = e.inputBuffer.getChannelData(0);
      var right = e.inputBuffer.getChannelData(1);
      // we clone the samples
      this.leftchannel.push(new Float32Array(left));
      this.rightchannel.push(new Float32Array(right));
      this.recordingLength += bufferSize;
      console.log('recording');
    }

    // we connect the recorder
    this.volume.connect(this.recorder);
    this.recorder.connect(this.context.destination);
  }

}