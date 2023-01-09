const recibir = async() =>{
    const response = await fetch('http:/localhost:3000/decodificarFrases')
    const respuesta = await response.text() 
    document.getElementById('respuesta').innerHTML = respuesta
}

recibir()