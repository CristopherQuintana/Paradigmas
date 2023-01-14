const fraseS = document.getElementById("fraseSecret");

fraseS.addEventListener("submit", async (event) => {
    event.preventDefault();
    let fraseSecreta = document.getElementById("fraseSecreta").value
    let frase = {frase:fraseSecreta}
    let fraseJson = JSON.stringify(frase)
    await fetch('http://localhost:3000/fraseSecreta', {
        method:'Post',
        body: fraseJson
    })
    window.location.href = "fraseNormal.html"
    //mandar datos a api
})

