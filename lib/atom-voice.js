'use babel';

import AtomVoiceView from './atom-voice-view';
import { CompositeDisposable } from 'atom';

export default {

  atomVoiceView: null,
  modalPanel: null,
  subscriptions: null,
  active: false,

  activate(state) {
    this.atomVoiceView = new AtomVoiceView(state.atomVoiceViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomVoiceView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-voice:start': () => this.atomVoiceView.startListen(),
      'atom-voice:stop': () => this.atomVoiceView.stopListen(),
      'atom-voice:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomVoiceView.destroy();
  },

  serialize() {
    return {
      atomVoiceViewState: this.atomVoiceView.serialize()
    };
  },

  toggle() {
    console.log("Toggling")
    this.active = this.active || false;
    if (this.active) {
      this.atomVoiceView.stopListen();
      this.active = false;
    } else {
      this.atomVoiceView.startListen();
      this.active = true;
    }
    console.log('AtomVoice was toggled!');


    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
