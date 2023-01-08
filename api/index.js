const base = require('./controllers/funciones')
const express = require('express');
const cors = require('cors')
const fs = require('fs')
const app = express();
const port = 3000;
const routes = require('./routes/routes')

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
        const dataArray = fd.toString();
        console.log(dataArray)
        console.log(JSON.stringify(dataArray).split('\n'))
        res.send(JSON.stringify(dataArray))
    })
})

/*app.get('/codificarFrases', (req, res) => {
    fs.
})*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
