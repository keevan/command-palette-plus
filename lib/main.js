'use babel';

import OpenPluginView from './view';
import { CompositeDisposable } from 'atom';

export default {

    openPluginView: null,
    modalPanel: null,
    subscriptions: null,
    previouslyFocusedElement: null,

    activate(state) {
        this.openPluginView = new OpenPluginView(state.openPackageViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.openPluginView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'open-plugin:search-mode': () => this.toggle(),
            'open-plugin:command-mode': () => this.toggle()
        }));

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add(this.modalPanel.getElement(), {
            'core:cancel': () => this.toggle(),
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.openPluginView.destroy();
    },

    serialize() {
        return {
            openPackageViewState: this.openPluginView.serialize()
        };
    },

    toggle() {
        console.log('OpenPlugin was toggled!');
        this.openPluginView.reset()
        if (this.modalPanel.isVisible()) {
            this.modalPanel.hide()
            this.openPluginView.reset()
            this.previouslyFocusedElement?.focus()
        } else {
            this.previouslyFocusedElement = document.activeElement
            this.modalPanel.show()
            this.openPluginView.focus()
        }
    }

};
