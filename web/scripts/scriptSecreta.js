const fraseS = document.getElementById("fraseSecret");

fraseS.addEventListener("submit", (event) => {
    event.preventDefault();
    let fraseSecreta = document.getElementById("fraseSecreta").value
    let frase = {frase:fraseSecreta}
    let fraseJson = JSON.stringify(frase)
    fetch('http://localhost:3000/fraseSecreta', {
        method:'Post',
        body: fraseJson
    })
    //mandar datos a api
})

