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

module.exports = {
    encriptar, 
    desencriptar
}