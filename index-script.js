async function loadQuotes(){
    const quotes = await fetch('quotes.json')

    return quotes.json()
}

async function main(){
    f = await loadQuotes()
    index = Math.floor(Object.keys(f).length * Math.random())

    document.getElementById('quote').innerHTML = f[String(index)]
    return
}

main()