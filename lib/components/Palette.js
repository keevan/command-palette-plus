import React, { useRef, useState } from 'react';

import CommandPalettePlus from '../main'
import { filter } from 'fuzzaldrin-plus'

// TODO: Create it so additional commands become a service, deferred handling
// for other packages? Maybe borrow some commands from other packages directly
// (direct integration with certain packages) - why reinvent the WHOLE wheel.

function Suggestion({ title, subtitle = '', icon, hint = 'Jump to', focused }) {
    const focusedClass = focused && 'focused' || ''
    return (
        <div className={`suggestion ${focusedClass}`}>
            <div className="suggestion-icon">
                <span class={`icon icon-${icon}`}></span>
            </div>
            <div>
                <div className="suggestion-title">{title}</div>
                <div className="suggestion-subtitle">{subtitle}</div>
            </div>
            <div className="suggestion-hint">{hint}</div>
        </div>
    )
}

function getActiveElement() {
    return (document.activeElement === document.body) ? atom.views.getView(atom.workspace) : document.activeElement
}

/**
 * Get suggestions filtered down by the query provided
 */
function getSuggestions(query, otherSuggestions = []) {
    const suggestions = [
        ...otherSuggestions
    ]

    const filteredSuggestions = query !== ''
        ? filter(suggestions, query, { key: 'title' })
        : suggestions

    return filteredSuggestions
}

function Palette({ suggestions: otherSuggestions }) {
    const inputElement = useRef(null)

    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const suggestions = getSuggestions(query, otherSuggestions)

    return (
        <>
            <div className="input-area native-key-bindings">
                <input
                    ref={inputElement}
                    class="form-control"
                    type="text"
                    tabIndex={-1}
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value)
                        setSelectedIndex(0) // Reset after text changes
                    }}
                    onKeyUp={async (e) => {
                        switch (e.key) {
                            case 'ArrowDown':
                            setSelectedIndex(index => {
                                let newIndex = index + 1
                                if (newIndex >= suggestions.length) {
                                    return 0
                                }
                                return newIndex
                            })
                            break;

                            case 'ArrowUp':
                            setSelectedIndex(index => {
                                let newIndex = index - 1
                                if (newIndex < 0) {
                                    return suggestions.length - 1
                                }
                                return newIndex
                            })
                            break;

                            case 'Enter':
                            if (typeof suggestions?.[selectedIndex]?.callback === 'function') {
                                await suggestions[selectedIndex].callback({
                                    query // Could be useful for things like running a CLI command?
                                })
                                CommandPalettePlus.hide()
                            }
                            break;

                        }
                    }}
                />
            </div>
            {query === '' && (
                <div className="tips">
                    <div><b>Tip:</b> Type <code>#</code> to search issues</div>
                    <div>Type <code>?</code> for help and tips</div>
                </div>
            )}
            <div className="suggestions">
                {suggestions
                    .map((suggestion, index) => (
                        <Suggestion {...suggestion} focused={index === selectedIndex}/>
                    )
                )}
            </div>
        </>
    );
}

export default Palette
