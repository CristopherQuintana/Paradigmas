const {ElimRepetidos, Largo, FraseAMatriz, Encriptador, Desencriptador} = require('./controllers/funciones')
const guardarFrase = require('./controllers/enviarFrases/metodosFrases')
const {encriptar, desencriptar} = require('./controllers/codificar/codificar')
const express = require('express');
const cors = require('cors')
const readline = require('readline');
const fs = require('fs')
const app = express();
const port = 3000;

let fraseSec = 'No ha sido cambiada'
let fraseEn = 'No ha sido cambiada'
let codId

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
    const frase = req.body.frase
    let id = 0
    fs.readFile('./controllers/codificar/id.txt', (err, data) => {
        if (err) throw err
        id = parseInt(data)
        let temp = id
        temp++
        console.log(temp)
        fs.writeFile('./controllers/codificar/id.txt',temp.toString(), (err) => {
            if (err) throw err;
        });
        fraseSec = temp + ',' + frase
        guardarFrase("secreta", fraseSec)
        res.send("la frase secreta ha sido guardada")
    })
    
})

app.get('/mostrarFrasesSecretas', (req, res) => {
    fs.readFile('./controllers/frasesSecretas.txt', (err, fd) => {
        if (err) throw err
        const dataArray = fd.toString().split('\n')
        dataArray.pop()
        const fraseArray = dataArray.map(m => m.split(','))
        res.send(JSON.stringify(fraseArray))
    })
})

app.post('/selFraseSecreta', (req, res) => {
    fraseSec = req.body.frase
    res.send("la frase ha sido seleccionada")
})

app.post('/fraseNormal', (req, res) => {
    const frase = req.body.frase;
    const idYFrase = fraseSec.split(',')
    console.log(idYFrase)    
    const fraseEncriptada = encriptar(idYFrase[1], frase)
    fraseEn = fraseEncriptada
    guardarFrase("encriptada", idYFrase[0]+','+ fraseEncriptada)
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
        res.send(JSON.stringify(dataArray))
    })
})

app.get('/mostrarFrasesDecodificadas', (req, res) => {
    fs.readFile('./controllers/frasesDecodificadas.txt', (err, fd) => {
        if (err) throw err
        const dataArray = fd.toString().split('\n')
        res.send(JSON.stringify(dataArray))
    })
})

app.get('')

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
