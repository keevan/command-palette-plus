import React, { useRef, useEffect, useState } from 'react';

import CommandPalettePlus from '../main'
import { filter } from 'fuzzaldrin-plus'
import { CompositeDisposable } from 'atom'

// TODO: Create it so additional commands become a service, deferred handling
// for other packages? Maybe borrow some commands from other packages directly
// (direct integration with certain packages) - why reinvent the WHOLE wheel.

function Suggestion({ title, subtitle = '', icon, hint = 'Jump to', focused }) {
    const focusedClass = focused && 'focused' || ''
    return (
        <div className={`suggestion ${focusedClass}`}>
            <div className="suggestion-icon">
                <span className={`icon icon-${icon}`}></span>
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

/**
 * Hook that hides the palette if clicked outside
 * Based on https://stackoverflow.com/a/42234988
 */
function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                CommandPalettePlus.hide()
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}

function Palette({ suggestions: otherSuggestions }) {
    const paletteElement = useRef(null)
    const inputElement = useRef(null)
    useOutsideAlerter(paletteElement);

    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const suggestions = getSuggestions(query, otherSuggestions)

    useEffect(() => {
        const subscriptions = new CompositeDisposable();
        subscriptions.add(atom.commands.add('.command-palette-plus', {
            'vim-mode-plus:inner-entire': () => {
                inputElement.current?.select()
            },
            'core:select-all': () => {
                inputElement.current?.select()
            },
        }));

        return () => {
            subscriptions.dispose()
        }
    }, [])


    return (
        <div ref={paletteElement}>
            <div className="input-area native-key-bindings">
                <input
                    ref={inputElement}
                    className="form-control"
                    type="text"
                    tabIndex={-1}
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value)
                        setSelectedIndex(0) // Reset after text changes
                    }}
                    onKeyDown={async (e) => {
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

                            case 'Tab':
                            // Attempt to autocomplete the current suggestion by default
                            setQuery(suggestions[selectedIndex].title)
                            e.preventDefault() // Prevent jumping to another input
                            e.stopPropagation();
                            return false;

                        }
                    }}
                />
                {Boolean(suggestions?.length && selectedIndex >= 0 && suggestions?.[selectedIndex]?.title) && (
                    <input
                        className="form-control poor-mans-typeahead"
                        type="text"
                        readOnly={true}
                        value={
                            suggestions[selectedIndex].title.toLowerCase().startsWith(query.toLowerCase())
                                ? (
                                    suggestions[selectedIndex].title
                                    .replace(new RegExp(`^${query}`, 'gi'), query)
                                )
                                : `${query} — ${suggestions[selectedIndex].title}`
                        }
                    />
                )}
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
        </div>
    );
}

export default Palette
