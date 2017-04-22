'use babel';

var getuserMedia = require('get-user-media-promise');
var MicrophoneStream = require('microphone-stream');

var Speech = require('@google-cloud/speech');
// const speech = Speech();


const request = {
  sampleRate: 44100,
  encoding: 'LINEAR16',
  languageCode: 'en-US'
};

// const recognizeStream = speech.createRecognizeStream(request)
//   .on('error', console.error)
//   .on('data', (data) => process.stdout.write(data.results));

export default class AtomVoiceView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-voice');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The AtomVoice package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  startListen() {
    let ctx = this;
    this.microphone = getuserMedia({video: false, audio: true})
      .then((stream) => {
        this.micStream = new MicrophoneStream(stream);
        this.micStream.on('data', (chunk) => {
          console.log('In chunker');
        });

        // this.micStream.pipe(recognizeStream);

        // this.micStream.on('format', (format) => {
        //   console.log(format);
        // });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  stopListen() {
    this.micStream.stop();
  }

  getElement() {
    return this.element;
  }

}
