'use babel';

var getuserMedia = require('get-user-media-promise');
var MicrophoneStream = require('microphone-stream');
var record = require('node-record-lpcm16');
var net = require('net');
var hashTable = require('./hash-table.js');
import { CompositeDisposable } from 'atom';

const HOST = '127.0.0.1';
const PORT = 10001;
var client = new net.Socket();

export default class AtomVoiceView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-voice');
    this.editor = atom.workspace.getActiveTextEditor();
    this.editorElement = atom.views.getView(this.editor);

    atom.commands.dispatch(this.editorElement, 'vim-mode-plus:reset-normal-mode');
    this.currentState = 'normal';
    this.currentData = null;
  }

  startClient() {
    client.connect(PORT, HOST, () => {
      console.log('Connected to socket');
    });

    client.on('data', (data) => {
      parsedData = data.toString();
      if(this.currentData != parsedData) {
        this.editor = atom.workspace.getActiveTextEditor();
        this.editorElement = atom.views.getView(this.editor);
        this.currentData = parsedData;
        console.log(this.currentData);
        this.magic(this.currentData);
      }
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  }

  magic(sentence) {
    if(sentence.includes('normal mode')) {
      console.log('Switching to normal mode.')
      this.currentState = 'normal';
      atom.commands.dispatch(this.editorElement, 'vim-mode-plus:activate-normal-mode');
    } else if(sentence.includes('insert mode')) {
      console.log('Switching to insert mode.')
      this.currentState = 'insert';
      atom.commands.dispatch(this.editorElement, 'vim-mode-plus:activate-insert-mode');
    } else if(sentence.includes('visual mode')) {
      console.log('Switching to visual mode.')
      this.currentState = 'visual';
      atom.commands.dispatch(this.editorElement, 'vim-mode-plus:activate-characterwise-visual-mode');
    } else {
      sentenceArr = sentence.split(' ');
      for(let i = 0; i < sentenceArr.length; i++) {
        let word = sentenceArr[i];
        if(this.currentState === 'normal') {
          let index = hashTable.table['normal mode'].indexOf(word);
          if(index !== -1) {
            atom.commands.dispatch(this.editorElement, hashTable.table['normal mode'][index]);
          } else {
            index = hashTable.table['not insert mode'].indexOf(word);
          }
        } else if(this.currentState === 'insert') {
          let index = hashTable.table['insert mode'].indexOf(word);
          if(index !== -1) {
            atom.commands.dispatch(this.editorElement, hashTable.table['insert mode'][index]);
          } else {
            this.editor.insertText(word + ' ');
          }
        } else {
          let index = hashTable.table['visual mode'].indexOf(word);
          if(index !== -1) {
            atom.commands.dispatch(this.editorElement, hashTable.table['visual mode'][index]);
          } else {
            index = hashTable.table['not insert mode'].indexOf(word);
          }
        }
      }
    }
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  startListen() {
    this.startClient();
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
