const fraseDecodificada = async () => {
    const response = await fetch('http:/localhost:3000/fraseDecodificada')
    console.log(response)
    const frase = await response.text()
    const fraseContainer =  document.getElementById("frase")
    console.log(frase)
    fraseContainer.innerHTML = frase;
}

fraseDecodificada()