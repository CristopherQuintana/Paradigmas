const fs = require('fs')
const {ElimRepetidos, Largo, FraseAMatriz, Encriptador, Desencriptador} = require('../funciones')

const fraseSecretaAMatriz = (fraseSecreta) => {
    const elimRepetidos = ElimRepetidos(fraseSecreta)
    const largo = Largo(elimRepetidos)
    const matriz = FraseAMatriz(elimRepetidos)
    return {matriz: matriz, largo: largo}
}

const obtenerFrases = (txt) => {
    const obtenerFrases = fs.readFileSync(txt)
    const frases = obtenerFrases.toString().split('\n')
    frases.pop()
    return frases
}

const encriptar = (fraseSecreta, frase) => {
    const data = fraseSecretaAMatriz(fraseSecreta)
    return Encriptador(data.matriz, frase, data.largo)
}

const desencriptar = (fraseSecreta, frase) => {
    const data = fraseSecretaAMatriz(fraseSecreta)
    return Desencriptador(data.matriz, frase, data.largo)
}

const buscarID = (id) => {
    let fd = fs.readFileSync('./controllers/frasesSecretas.txt');
    let idRegex = new RegExp(id);
    let corresponde;
    let lineas = fd.toString().split('\n');
    for (let linea of lineas) {
        if (linea.match(idRegex)) {
            corresponde = linea;
        }
    }
    console.log(corresponde);
    return corresponde;
}

module.exports = {
    encriptar, 
    desencriptar,
    buscarID
}