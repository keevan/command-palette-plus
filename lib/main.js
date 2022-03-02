import View from './view';
import { CompositeDisposable } from 'atom';

export default {

    view: null,
    modalPanel: null,
    subscriptions: null,
    previouslyFocusedElement: null,

    activate(state) {
        this.view = new View(state.openPackageViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.view.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'command-palette-plus:search-mode': () => this.toggle(),
            'command-palette-plus:command-mode': () => this.toggle()
        }));

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add(this.modalPanel.getElement(), {
            'core:cancel': () => this.toggle(),
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.view.destroy();
    },

    serialize() {
        return {
            openPackageViewState: this.view.serialize()
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
        const scopes = await this.view.getScopes()
        this.view.recalculateSuggestions({
            previouslyFocusedElement,
            scopes,
        })
        this.modalPanel.show()
        this.view.focus()
    },

    toggle() {
        // this.view.reset()
        if (this.modalPanel.isVisible()) {
            this.hide()
        } else {
            this.show()
        }
    },

    providePallete() {
        return this.view
    },

};
