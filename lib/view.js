import React from 'react';
import ReactDom from 'react-dom';
import Palette from './components/Palette'
import { CompositeDisposable } from 'atom'

export default class SearchModeView {

    suggestions = []
    scopes = []
    suggestionCallbacks = []
    scopeCallbacks = []

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('command-palette-plus');

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        this.renderFn((
            <Palette suggestions={this.suggestions} />
        ), this.element);
    }

    focus() {
        const [editorEl] = this.element.getElementsByTagName('input')
        editorEl?.focus()
    }

    reset() {
        this.renderFn((
            <Palette suggestions={this.suggestions} />
        ), this.element);
    }

    addSuggestion(command) {
       this.suggestions.push(command)
       this.reset()
    }

    addScope(scope) {
       this.scopes.push(scope)
    }

    // Add a function which accepts a callback which is called when the pallete is toggled
    // Under the right scopes, this will return the relevant suggestions
    addScopeCallback(callback) {
        this.scopeCallbacks.push(callback)
    }

    // Add a function which accepts a callback which is called when the pallete is toggled
    // Under the right scopes, this will return the relevant suggestions
    addSuggestionCallback(callback) {
        this.suggestionCallbacks.push(callback)
    }

    async getScopes() {
        // Reset the list of set scopes
        this.scopes = []
        // Pass in the current determined scope or any relevant information to
        // help the package determine the scope, otherwise its up to the
        // individual packages to decide (e.g. based on editor circumstances).
        this.scopeCallbacks.forEach(async callback => await callback())
        return this.scopes
    }

    async recalculateSuggestions({ previouslyFocusedElement, scopes }) {
        // Reset the list of suggestions added
        this.suggestions = []
        // Pass in the current determined scope or any relevant information to
        // help the package determine the scope, otherwise its up to the
        // individual packages to decide (e.g. based on editor circumstances).
        this.suggestionCallbacks.forEach(callback => callback({ previouslyFocusedElement, scopes }))
    }

    renderFn(component, node, callback) {
        return ReactDom.render(component, node, callback);
    }

    // Returns an object that can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {
        this.subscriptions.dispose();
        this.element.remove();
    }

    getElement() {
        return this.element;
    }

}
