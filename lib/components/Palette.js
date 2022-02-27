import React, { useRef, useState } from 'react';

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

const suggestions = [
    {group: 'Atom', title: 'Settings', icon: 'gear'},
    {group: 'Browser', title: `keevan/${path.basename(atom.project.getPaths()[0])}`, icon: 'repo'},
    {group: 'Browser', title: 'Issues', icon: 'issue-opened'},
    {group: 'Browser', title: 'Pull Requests', icon: 'git-pull-request'},
    {group: 'Browser', title: 'Discussions', icon: 'comment-discussion'},
    {group: 'Browser', title: 'Actions', icon: 'playback-play'},
    {group: 'Browser', title: 'Projects', icon: 'tasklist'},
    {group: 'Browser', title: 'Settings', icon: 'gear'},
]

function Palette() {
    // Declare a new state variable, which we'll call "count"
    const inputElement = useRef(null)

    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)

    const filteredSuggestions = suggestions
        .filter(suggestion => {
            return suggestion.title.toLowerCase().includes(query.toLowerCase())
        })

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
                        if (e.key === 'ArrowDown') {
                            setSelectedIndex(index => {
                                let newIndex = index + 1
                                if (newIndex >= filteredSuggestions.length) {
                                    return 0
                                }
                                return newIndex
                            })
                        } else if (e.key === 'ArrowUp') {
                            setSelectedIndex(index => {
                                let newIndex = index - 1
                                if (newIndex < 0) {
                                    return filteredSuggestions.length - 1
                                }
                                return newIndex
                            })
                        }
                    }}
                />
            </div>
            <div className="tips">
                <div><b>Tip:</b> Type <code>#</code> to search issues</div>
                <div>Type <code>?</code> for help and tips</div>
            </div>
            <div className="suggestions">
                {filteredSuggestions
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
