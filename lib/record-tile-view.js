'use babel';

import { CompositeDisposable } from 'atom';

export default class RecordTileView {
  showState(state) {
    if (state.isListening) {
      return '(listening)';
    } else {
      return '(waiting)'
    }
  }

  constructor(state) {
    this.element = document.createElement('span');
    this.element.innerHTML = this.showState(state);
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
