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

    hide() {
        this.modalPanel.hide()
        this.previouslyFocusedElement?.focus()
    },

    async show() {
        const previouslyFocusedElement = document.activeElement
        this.previouslyFocusedElement = previouslyFocusedElement
        // Get the scopes for the state Atom is in when the palette is
        // triggered, what the scope is can be handled by each plugin, or it
        // can be dependant on a check some other plugin has.. either way,
        // the scopes returned will be an array of strings, that can be
        // subsequently checked in each plugin's suggestion check.
        const scopes = await this.openPluginView.getScopes()
        this.openPluginView.recalculateSuggestions({
            previouslyFocusedElement,
            scopes,
        })
        this.modalPanel.show()
        this.openPluginView.focus()
    },

    toggle() {
        // this.openPluginView.reset()
        if (this.modalPanel.isVisible()) {
            this.hide()
        } else {
            this.show()
        }
    },

    providePallete() {
        return this.openPluginView
    },

};
