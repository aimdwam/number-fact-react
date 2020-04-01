
const NumberInput = (props) => {
    const [text, setText] = React.useState("")
    return <form onSubmit={evt => {
        evt.preventDefault()
        if (text)
            props.onSubmit(text)
        setText("")
    }}>
        <input type="text" value={text}
          onChange={evt => setText(evt.target.value)}></input>
    </form>
}

const FactItem = ({text}) => {
    return <li>{text}</li>
}

const FactList = (props) => {
    return <ul>{
        props.facts.map(f => <FactItem text={f}/> )
    }</ul>
}

const App = (props) => {
    const [facts, setFacts] = React.useState([])

    const handleSubmit = text => {
        let promise = fetchFact(text)
    }

    return <div>
        <h1>Number Facts</h1>
        <NumberInput onSubmit={text => setFacts([text, ...facts])} />
        <FactList facts={facts}/>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'))