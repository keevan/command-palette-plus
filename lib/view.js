import React from 'react';
import ReactDom from 'react-dom';
import Palette from './components/Palette'
import { SelectListView, $$ } from 'atom-space-pen-views-plus';

export default class SearchModeView extends SelectListView {

    constructor(serializedState) {
        super();

        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('open-plugin');

        // // Create message element
        // const message = document.createElement('div');
        // message.textContent = 'The OpenPlugin package is Alive! It\'s ALIVE!';
        // message.classList.add('message');

        this.renderFn((
            <Palette />
        ), this.element);
        // this.element.appendChild(message);
    }

    focus() {
        const [editorEl] = this.element.getElementsByTagName('atom-text-editor')
        editorEl.focus()
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
        this.element.remove();
    }

    getElement() {
        return this.element;
    }

}
