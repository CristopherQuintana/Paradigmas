const fs = require('fs')

const guardarFrase = (tipo, frase) => {
    let rutaArchivo;
    if (tipo === "secreta") {
        rutaArchivo = "./controllers/frasesSecretas.txt"
    }
    else if (tipo ==="decodificada"){
        rutaArchivo = "./controllers/frasesDecodificadas.txt"
    }
    else {
        rutaArchivo = "./controllers/frasesCodificadas.txt"
    }
    fs.appendFile(rutaArchivo, frase + '\n', (err, fd) => {
        if (err) throw err
        if (frase.length === 0) throw new Error('El mensaje tiene 0 de largo')
        console.log('Se ha guardado la frase')
        console.log(frase)
    })
}

module.exports = guardarFrase