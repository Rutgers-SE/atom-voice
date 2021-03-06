'use babel';

var record = require('node-record-lpcm16');
var net = require('net');
var hashTable = require('./hash-table.js');
import { CompositeDisposable } from 'atom';
import { NumberMapping, parsed_elements } from './parsing';

function codenize(tokens) {
  return tokens.map(token => parsed_elements[token] || token);
}

function normalizeNumber(rawNumber) {
  console.log(rawNumber);
  if (!parseInt(rawNumber)) {
    return NumberMapping[rawNumber] || 1;
  }
  return parseInt(rawNumber);
}

function getCountModifier(tokens, location) {
  let mod = 1;
  if (tokens[location] !== 'undefined') {
    mod = normalizeNumber(tokens[location]);
    // console.log(mod);
  }
  return mod;
}

let directions = {
  'up': (editor, mod) => editor.moveUp(mod),
  'down': (editor, mod) => editor.moveDown(mod),
  'left': (editor, mod) => editor.moveLeft(mod),
  'right': (editor, mod) => editor.moveRight(mod),
  'write': (editor, mod) => editor.moveRight(mod),
  'begin': (editor, mod) => editor.moveToBeginningOfLine(),
  'end': (editor, mod) => editor.moveToEndOfLine()
};

let selectionDirections = {
  'up': (editor, mod) => editor.selectUp(mod),
  'down': (editor, mod) => editor.selectDown(mod),
  'left': (editor, mod) => editor.selectLeft(mod),
  'right': (editor, mod) => editor.selectRight(mod)
}

const HOST = '127.0.0.1';
const PORT = 10001;
var client = new net.Socket();

function times(n, fn) {
  for (let i = 0; i < n; i++) fn();
}

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
    this.isListening = false;
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
    // HACK:
    let newLine = false;
    if (sentence.includes('\n')) {
      newLine = true;
    }
    let tokens = sentence.trim().split(" ").map((s) => s.toLowerCase());
    console.log(tokens);
    if (tokens[0] == 'move') {
      times(
        getCountModifier(tokens, 2),
        () => (directions[tokens[1]] || function (ed) {})(this.editor, 1)
      );
    } else if (tokens[0] == 'delete') {
      this.editor.delete();
    } else if (tokens[0] == 'backspace') {
      times(
        getCountModifier(tokens, 1),
        () => this.editor.backspace()
      );
    } else if (tokens[0] == 'execute') {
      // this will be annoying
    } else if (tokens[0] == 'undo') {
      this.editor.undo();
    } else if (tokens[0] == 'redo') {
      this.editor.redo();
    } else if (newLine) {
      this.editor.insertNewline();
    } else if (tokens[0] == 'code') {
      insertionTokens = tokens.slice(1, tokens.length);
      this.editor.insertText(codenize(insertionTokens).join(''));
    } else if (tokens[0] == 'text') {
      insertionTokens = tokens.slice(1, tokens.length);
      this.editor.insertText(insertionTokens.join(' '));
    } else if (tokens[0] == 'select') {
      times(
        getCountModifier(tokens, 2),
        () => (selectionDirections[tokens[1]] || function (ed) {})(this.editor)
      );
    } else if (tokens[0] == 'expand') {
      console.log(atom.commands.dispatch(this.editorElement, 'autocomplete-plus:complete'));
    }
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      isListening: this.isListening
    };
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  startListen() {
    this.isListening = true;
    this.startClient();
    record.start({
      sampleRateHertz: 16000,
      threshold: 0
    }).pipe(client);
  }

  stopListen() {
    this.isListening = false;
    record.stop();
    client.end();
  }

  getElement() {
    return this.element;
  }

}
