import React, { useRef, useState } from 'react';

import OpenPlugin from '../main'
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
function getSuggestions(query) {
    // TODO: Break into groups (atom, browser, etc)
    // TODO: Break into scope aware suggestions (e.g. submodules vs current package vs project vs other..)
    const projectDirName = path.basename(atom.project.getPaths()[0])

    const suggestions = [
        {group: 'Atom', title: 'Settings', icon: 'gear', callback: async () => {
            await atom.workspace.open(`atom://config/packages/${projectDirName}`)
            OpenPlugin.toggle()
        }},
        {group: 'Test', title: `Test Command Pallete command`, icon: 'star', callback: () => {
            const command = 'command-palette:toggle'
            const customEvent = new CustomEvent(command, {bubbles: true, cancelable: true})
            getActiveElement().dispatchEvent(customEvent)
        }},
        {group: 'Browser', title: `keevan/${projectDirName}`, icon: 'repo'},
        {group: 'Browser', title: 'Issues', icon: 'issue-opened'},
        {group: 'Browser', title: 'Pull Requests', icon: 'git-pull-request'},
        {group: 'Browser', title: 'Discussions', icon: 'comment-discussion'},
        {group: 'Browser', title: 'Actions', icon: 'playback-play'},
        {group: 'Browser', title: 'Projects', icon: 'tasklist'},
        {group: 'Browser', title: 'Settings', icon: 'gear'},
    ]

    const filteredSuggestions = query !== ''
        ? filter(suggestions, query, { key: 'title' })
        : suggestions

    return filteredSuggestions
}

function Palette() {
    // Declare a new state variable, which we'll call "count"
    const inputElement = useRef(null)

    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const suggestions = getSuggestions(query)

    return (
        <>
            <div className="input-area native-key-bindings">
                <input
                    ref={inputElement}
                    class="form-control"
                    type="text"
                    tabIndex={-1}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyUp={e => {
                        console.log(e.key)
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
                                suggestions[selectedIndex].callback()
                            }
                            break;

                        }
                    }}
                />
            </div>
            <div className="tips">
                <div><b>Tip:</b> Type <code>#</code> to search issues</div>
                <div>Type <code>?</code> for help and tips</div>
            </div>
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

// <button onClick={() => {
//     setCount(count + 1)
//     atom.notifications.addInfo(String(count))
// }}>
//   Click me
// </button>
