const initialInput = '# Welcome\n## to My\n```\nfunction projectName()\n\t{\n\t\treturn "Markdown Previewer"\n\t}\n```\nYou can:\n1. Write your code in "Editor".\n2. Change size of windows ("Editor" or "Previewer")\n3. Preview the created and stylistically modified code in the "Previewer".\n\nHere you can also:\n- make the text **bold** or _italic_, and even **_both!_**;\n- insert quotes: \n> Block Quotes!\n- insert images:  \n![picture](https://github.com/S4DN8/Pictures/blob/main/logo.png?raw=true)\n- insert inline code: \n`<div></div>`\n- insert links: [Marked Documentation](https://marked.js.org/) \n- and much more...';

let TAStyleMax = {height: '100vh'};
let TAStyleMin = {height: 0};

marked.use({
    breaks: true
  })

const Editor = ({value, onChange, onClick, textAreaStyle, buttonState}) => {
    return (
        <div id='editor-field'>
            <div className='header'>
                <span>Editor</span>
                {buttonState && <i className="fa-solid fa-maximize" onClick={onClick}></i>}
                {!buttonState && <i className="fa-solid fa-minimize" onClick={onClick}></i>}
            </div>
            <textarea id='editor' value={value} onChange={onChange} style={textAreaStyle}></textarea>
        </div>
    );
}

const Previewer = ({input, onClick, buttonState}) => {
    return (
        <div id='previewer-field'>
            <div className='header'>
                <span>Previewer</span>
                {buttonState && <i className="fa-solid fa-maximize" onClick={onClick}></i>}
                {!buttonState && <i className="fa-solid fa-minimize" onClick={onClick}></i>}
            </div>
            <div id='pre-wrap'>
                <div id='preview' dangerouslySetInnerHTML={{__html: marked.parse(input)}}/>
            </div>
        </div>
    );
}

class WindowApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: initialInput,
            onScreenEditor: true,
            onScreenPreviewer: true,
            styleTextArea: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.hendleClickEditor = this.hendleClickEditor.bind(this);
        this.hendleClickPrewiewer = this.hendleClickPrewiewer.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    hendleClickEditor() {
        let style = {};
        if (this.state.onScreenPreviewer) {
            style = TAStyleMax
        } else {
            style = TAStyleMin
        }
        this.setState({
            onScreenPreviewer: !this.state.onScreenPreviewer,
            styleTextArea: style
        })
    }

    hendleClickPrewiewer() {
        this.setState({
            onScreenEditor: !this.state.onScreenEditor
        })
    }

    render() {
        return (
            <div id='field'>
                {this.state.onScreenEditor && <Editor value={this.state.input} onChange={this.handleChange} onClick={this.hendleClickEditor} buttonState={this.state.onScreenPreviewer} textAreaStyle={this.state.styleTextArea}/>}
                {this.state.onScreenPreviewer && <Previewer input={this.state.input} onClick={this.hendleClickPrewiewer} buttonState={this.state.onScreenEditor}/>}
            </div>
        );
    }
}


ReactDOM.createRoot(document.getElementById('root')).render(<WindowApp />);
