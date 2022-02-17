'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,
  // Convenience helper
  openLinkOnDoubleCopy: true,

  activate() {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'package-name:action': () => this.action(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  action() {
    // Do something cool
  },
};
