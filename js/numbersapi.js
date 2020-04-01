let numberapi = cat => num => {
    let url = "http://numbersapi.com/" + num + "/" + cat + "?json"
    return fetch(url).then(
        response => response.json()
        , error => console.log(error)
    ).then(data =>
        data.found ? data.text : Promise.reject()
    )
}

let mathFact = numberapi("math")
let yearFact = numberapi("year")
let defaultFact = numberapi("")

let fetchFact = num => {
    return mathFact(num)
        .catch(e => yearFact(num))
        .catch(e => defaultFact(num))
        .catch(e => num + " is unremarkable.")
}