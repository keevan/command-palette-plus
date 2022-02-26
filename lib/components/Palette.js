import React, { useRef, useEffect } from 'react';
import { TextEditor } from 'atom';


function Suggestion({ title, subtitle = '', icon, hint = 'Jump to' }) {
    return (
        <div className="suggestion">
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


function Palette() {
    // Declare a new state variable, which we'll call "count"
    // const [count, setCount] = useState(0);
    const inputElement = useRef(null)

    // useEffect(() => {
    //     inputElement.current.focus()
    // }, [])
    console.log(inputElement)


    return (
        <>
            <atom-text-editor mini type="text" ref={inputElement} />
            <div className="tips">
                <div>Tip: Type <code>#</code> to search issues</div>
                <div>Type <code>?</code> for help and tips</div>
            </div>
            <div className="suggestions">
                <Suggestion title={'user/repo-name'} icon={'repo'}/>
                <Suggestion title={'Issues'} icon={'issue-opened'}/>
                <Suggestion title={'Pull Requests'} icon={'git-pull-request'}/>
                <Suggestion title={'Discussions'} icon={'comment-discussion'}/>
                <Suggestion title={'Actions'} icon={'playback-play'}/>
                <Suggestion title={'Projects'} icon={'tasklist'}/>
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
