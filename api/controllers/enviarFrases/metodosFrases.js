const fs = require('fs')

const guardarFrase = (tipo, frase) => {
    let rutaArchivo;
    if (tipo === "secreta") {
        rutaArchivo = "./controllers/frasesSecretas.txt"
    }
    else if(tipo === "encriptada"){
        rutaArchivo = "./controllers/frasesCodificadas.txt"
    }
    else {
        rutaArchivo = "./controllers/UsuariosRegistrados.txt"
    }
    fs.appendFile(rutaArchivo, frase + '\n', (err, fd) => { //el redfile borra todo el archivo y lo sobreescribe, el appendfile toma el codigo y le agrega, osea va apilando información
        if (err) throw err
        if (frase.length === 0) throw new Error('El mensaje tiene 0 de largo')
        console.log('Se ha guardado la frase')
        console.log(frase)
    })
}

module.exports = guardarFrase