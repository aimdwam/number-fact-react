
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

const FactItem = ({factPromise}) => {
    let [text, setText] = React.useState("fetching facts for " + factPromise.num + "...")
    factPromise.then(setText)

    return <li>{text}</li>
}

const FactList = ({facts}) => {
    let top5 = []
    for (let index = 0; index < facts.length && index < 5; index++) {
        const element = facts[index];
        top5.push(element)
    }

    return <ul>{
        top5.map(f => <FactItem key={f.key} factPromise={f}/> )
    }</ul>
}

const App = (props) => {
    const [facts, setFacts] = React.useState([])

    const handleSubmit = text => {
        let key = "fact_" + text
        let cache = localStorage.getItem(key)
        let promise = null
        if (cache) {
            promise = Promise.resolve(cache)
        } else {
            promise = fetchFact(text)
            promise.then(fact => {
                localStorage.setItem(key, fact)
            })
        }
        promise.num = text
        promise.key = facts.length
        setFacts([promise, ...facts])
    }

    return <div>
        <h1>Number Facts</h1>
        <NumberInput onSubmit={handleSubmit} />
        <FactList facts={facts}/>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'))