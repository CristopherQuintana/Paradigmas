const {ElimRepetidos, Largo, FraseAMatriz, Encriptador, Desencriptador} = require('./controllers/funciones')
const guardarFrase = require('./controllers/enviarFrases/metodosFrases')
const encriptar = require('./controllers/codificar/codificar')
const express = require('express');
const cors = require('cors')
const fs = require('fs')
const app = express();
const port = 3000;

let fraseSec = 'No ha sido cambiada'
let fraseEn = 'No ha sido cambiada'

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json({
    type: "*/*"
}))

app.use(cors())

app.post('/fraseSecreta', (req, res) => {
    const frase = req.body.frase;
    guardarFrase("secreta", frase);
    fraseSec = frase
    res.send("la frase secreta ha sido guardada")
})

app.get('/mostrarFrasesSecretas', (req, res) => {
    fs.readFile('./controllers/frasesSecretas.txt', (err, fd) => {
        if (err) throw err
        const dataArray = fd.toString().split('\n')
        dataArray.pop()
        console.log(dataArray)
        res.send(JSON.stringify(dataArray))
    })
})

app.post('/selFraseSecreta', (req, res) => {
    fraseSec = req.body.frase
    console.log(fraseSec)
    res.send("la frase ha sido seleccionada")
})

app.post('/fraseNormal', (req, res) => {
    const frase = req.body.frase;
    console.log(fraseSec)
    console.log(frase)
    const fraseEncriptada = encriptar(fraseSec, frase)
    fraseEn = fraseEncriptada
    guardarFrase("encriptada", fraseEncriptada)
    console.log(fraseEncriptada)
    console.log(fraseEn)
    res.send("la frase encriptada ha sido guardada")
})

app.get('/fraseCodificada', (req, res) => {
    console.log(fraseEn)
    res.send(fraseEn)
})

app.get('/mostrarFrasesCodificadas', (req, res) => {
    fs.readFile('./controllers/frasesCodificadas.txt', (err, fd) => {
        if (err) throw err
        const dataArray = fd.toString().split('\n')
        dataArray.pop()
        console.log(dataArray)
        res.send(JSON.stringify(dataArray))
    })
})

app.get('/mostrarFrasesDecodificadas', (req, res) => {
    fs.readFile('./controllers/frasesDecodificadas.txt', (err, fd) => {
        if (err) throw err
        const dataArray = fd.toString().split('\n')
        console.log(dataArray)
        res.send(JSON.stringify(dataArray))
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
