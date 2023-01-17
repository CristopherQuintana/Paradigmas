const fraseN = document.getElementById("fraseNormal");

fraseN.addEventListener("submit", (event) => {
    event.preventDefault();
    let fraseNormal = document.getElementById("frase").value
    let frase = {frase:fraseNormal}
    let fraseJson = JSON.stringify(frase)
    fetch('http://localhost:3000/fraseNormal', {
        method:'POST',
        body: fraseJson
    })
    console.log('test')
    window.location.href = "mostrarFraseCodificadaS.html"
    //mandar datos a api
})