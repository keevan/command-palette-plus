import React from 'react';
import ReactDom from 'react-dom';
import Palette from './components/Palette'
import { SelectListView, $$ } from 'atom-space-pen-views-plus';
import { CompositeDisposable } from 'atom'

export default class SearchModeView extends SelectListView {

    constructor(serializedState) {
        super();

        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('open-plugin');

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        this.renderFn((
            <Palette />
        ), this.element);
        // this.element.appendChild(message);
        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add(this.element, {
            'core:select-all': () => {
                const [input] = this.element.getElementsByTagName('input')
                if (input) {
                    input.select()
                }
            },
        }));

    }

    focus() {
        const [editorEl] = this.element.getElementsByTagName('input')
        editorEl?.focus()
    }

    reset() {
        this.renderFn((
            <Palette />
        ), this.element);
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
