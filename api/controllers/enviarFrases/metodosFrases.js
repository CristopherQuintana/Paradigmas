const fs = require('fs')

const guardarFrase = (tipo, frase) => {
    let rutaArchivo;
    if (tipo === "secreta") {
        rutaArchivo = "./controllers/frasesSecretas.txt"
    } else {
        rutaArchivo = "./controllers/frasesCodificadas.txt"
    }
    fs.appendFile(rutaArchivo, frase + '\n', (err, fd) => {
        if (err) throw err
        console.log('Se ha guardado la frase')
    })
}

module.exports = guardarFrase