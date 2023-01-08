const recibir = async() =>{
    const response = await fetch('http:/localhost:3000/codificarFrases')
    const respuesta = await response.text() 
    const escribir = document.write(respuesta)
    return escribir
}

recibir()