'use babel';

var getuserMedia = require('get-user-media-promise');
var MicrophoneStream = require('microphone-stream');
var record = require('node-record-lpcm16');
var net = require('net');
import { CompositeDisposable } from 'atom';

var HOST = '127.0.0.1';
var PORT = 10001;
var client = new net.Socket();

function startClient() {
  client.connect(PORT, HOST, () => {
    console.log('Connected to socket');
  });

  client.on('data', (data) => {
    console.log(data.toString());
  });

  client.on('close', () => {
    console.log('Connection closed');
  });
}

export default class AtomVoiceView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-voice');
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  startListen() {
    startClient();
    record.start({
      sampleRateHertz: 16000,
      threshold: 0
    }).pipe(client);
  }

  stopListen() {
    record.stop();
    client.end();
  }

  getElement() {
    return this.element;
  }

}
