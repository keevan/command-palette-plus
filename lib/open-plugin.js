'use babel';

import OpenPluginView from './open-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  openPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.openPackageView = new OpenPackageView(state.openPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.openPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.openPackageView.destroy();
  },

  serialize() {
    return {
      openPackageViewState: this.openPackageView.serialize()
    };
  },

  toggle() {
    console.log('OpenPlugin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
