const {ElimRepetidos, Largo, FraseAMatriz, Encriptador, Desencriptador} = require('./controllers/funciones')
const express = require('express');
const cors = require('cors')
const fs = require('fs')
const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json({
    type: "*/*"
}))

app.use(cors())

app.get('/prueba', (req, res) => {
    res.send('Hola, estoy funcionando')
})

app.post('/fraseSecreta', (req, res) => {
    const frase = req.body.frase;
    fs.writeFile('./controllers/fraseSecreta.txt', frase, (err, fd) => {
        if (err) throw err
        console.log('Se ha guardado la frase secreta')
    })
    res.send("la frase secreta ha sido guardada")
})

app.post('/fraseNormal', (req, res) => {
    const frase = req.body.frase;
    fs.appendFile('./controllers/frases.txt', frase + '\n', (err, fd) => {
        if (err) throw err
        console.log('Se ha guardado la frase')
    })
    res.send("la frase ha sido guardada")
})

app.get('/mostrarFrases', (req, res) => {
    fs.readFile('./controllers/frases.txt', (err, fd) => {
        if (err) throw err
        const dataArray = fd.toString().split('\n')
        console.log(dataArray)
        res.send(JSON.stringify(dataArray))
    })
})

app.get('/codificarFrases', (req, res) => {
    const obtenerSecreta = fs.readFileSync('./controllers/fraseSecreta.txt')
    const fraseSecreta = obtenerSecreta.toString()
    const elimRepetidos = ElimRepetidos(fraseSecreta)
    console.log(fraseSecreta)
    console.log(elimRepetidos)
    const largo = Largo(elimRepetidos)
    const matriz = FraseAMatriz(elimRepetidos)
    const obtenerFrases = fs.readFileSync('./controllers/frases.txt')
    const frases = obtenerFrases.toString().split('\n')
    console.log(frases)
    const codificadas = []
    for(let frase of frases){
        if(frase.length > 0){
            let codificada = Encriptador(matriz, frase, largo)
            codificadas.push(codificada)
        }
    }
    const frasesCodificadas = codificadas.join('\n')
    fs.writeFile('./controllers/frasesCodificadas.txt', frasesCodificadas, (err, fd) => {
        if (err) throw err
        console.log(frasesCodificadas)
        res.send("las frases han sido codificadas!")
    })
})

app.get('/decodificarFrases', (req, res) => {
    const obtenerSecreta = fs.readFileSync('./controllers/fraseSecreta.txt')
    const fraseSecreta = obtenerSecreta.toString()
    const elimRepetidos = ElimRepetidos(fraseSecreta)
    console.log(fraseSecreta)
    console.log(elimRepetidos)
    const largo = Largo(elimRepetidos)
    const matriz = FraseAMatriz(elimRepetidos)
    const obtenerFrases = fs.readFileSync('./controllers/frasesCodificadas.txt')
    const frases = obtenerFrases.toString().split('\n')
    console.log(frases)
    const decodificadas = []
    for(let frase of frases){
        if(frase.length > 0){
            let decodificada = Desencriptador(matriz, frase, largo)
            decodificadas.push(decodificada)
        }
    }
    const frasesDecodificadas = decodificadas.join('\n')
    fs.writeFile('./controllers/frasesDecodificadas.txt', frasesDecodificadas, (err, fd) => {
        if (err) throw err
        console.log(frasesDecodificadas)
        res.send("las frases han sido decodificadas!")
    })
})

app.get('/mostrarFrasesCodificadas', (req, res) => {
    fs.readFile('./controllers/frasesCodificadas.txt', (err, fd) => {
        if (err) throw err
        const dataArray = fd.toString().split('\n')
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
