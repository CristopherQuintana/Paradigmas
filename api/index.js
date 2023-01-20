const {
  ElimRepetidos,
  Largo,
  FraseAMatriz,
  Encriptador,
  Desencriptador,
} = require("./controllers/funciones");
const guardarFrase = require("./controllers/enviarFrases/metodosFrases");
const {
  encriptar,
  desencriptar,
  buscarID,
} = require("./controllers/codificar/codificar");
const express = require("express");
const cors = require("cors");
const readline = require("readline");
const fs = require("fs");
const app = express();
const port = 3000;

let fraseSec = "No ha sido cambiada";
let fraseEn = "No ha sido cambiada";
let fraseDes = "No ha sido cambiada";

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  express.json({
    type: "*/*",
  })
);

app.use(cors());

app.post("/fraseSecreta", (req, res) => {
  //Utilizada por el superusuario para ingresar una fraseSecreta
  const frase = req.body.frase; //Obtiene la frase del front
  let id = 0;
  fs.readFile("./controllers/codificar/id.txt", (err, data) => {
    //Lee la info del txt id
    if (err) throw err;
    id = parseInt(data); //Convierte el numero del txt (que esta en formato txt) a int
    let temp = id; //temporal pal id
    temp++;
    console.log(temp); //muestra por consola el id
    fs.writeFile("./controllers/codificar/id.txt", temp.toString(), (err) => {
      //Aqui se escribe en el id.txt, el temp (La id) lo convierte a String ya que no puedo escribir un int
      if (err) throw err;
    });
    fraseSec = temp + "," + frase; // aqui guardo el id con la frase separados por una coma
    guardarFrase("secreta", fraseSec); //Guardo la frase secreta en el txt (En este caso frasesSecretas.txt)
    res.send("la frase secreta ha sido guardada");
  });
});

app.get("/mostrarFrasesSecretas", (req, res) => {
  fs.readFile("./controllers/frasesSecretas.txt", (err, fd) => {
    if (err) throw err;
    const dataArray = fd.toString().split("\n");
    dataArray.pop();
    const fraseArray = dataArray.map((m) => m.split(","));
    res.send(JSON.stringify(fraseArray));
  });
});

app.post("/selFraseSecreta", (req, res) => {
  //Es cualquier boton de la vista mostrarFrasesSecretas
  fraseSec = req.body.frase; //El nombre del boton se guarda en esta variable
  res.send("la frase ha sido seleccionada"); //Confirma la ejecucción
});

app.post("/fraseNormal", (req, res) => {
  const frase = req.body.frase; //Aqui llega la frase del front
  const idYFrase = fraseSec.split(","); //Es la frase secreta seleccionada (linea 57)
  console.log(idYFrase);
  const fraseEncriptada = encriptar(idYFrase[1], frase); //Encripto la frase
  fraseEn = fraseEncriptada; //auxiliar tendrá el valor 'No ha sido cambiada' hasta que se encripte la frase.
  guardarFrase("encriptada", idYFrase[0] + "," + fraseEncriptada); //Se guarda la frase en el txt frasesCodificadas
  res.send("la frase encriptada ha sido guardada"); //Confirmación de la ejecucción
});

app.get("/fraseCodificada", (req, res) => {
  //Muestra en el front la frase encriptada o codificada
  console.log(fraseEn); //Muestra en consola
  res.send(fraseEn); //Muestra en el front
});

app.get("/mostrarFrasesCodificadas", (req, res) => {  //Lee el archivo frasesCodificadas
    fs.readFile("./controllers/frasesCodificadas.txt", (err, fd) => {  //Se especifica la ruta del archivo txt
      if (err) throw err; //Si esque existe un error, lo retorna
      const dataArray = fd.toString().split("\n"); //fd es lo obtenido del txt, lo conviertes a string y se separa con saltos de linea
      dataArray.pop(); //Elimina el ultimo salto de linea, sin este codigo se creará un botón sin texto, vacío
      res.send(JSON.stringify(dataArray)); //Muestra la frase en el front
    });
});

//app.get('/mostrarFrasesDecodificadas', (req, res) => {
//    fs.readFile('./controllers/frasesDecodificadas.txt', (err, fd) => {
//        if (err) throw err
//        const dataArray = fd.toString().split('\n')
//        res.send(JSON.stringify(dataArray))
//    })
//})

app.post("/verificarCredenciales", (req, res) => {
  try {
    let user = req.body.usuario;
    let pass = req.body.pass;
    let data;
    fs.readFile("./controllers/UsuariosRegistrados.txt", (err, fd) => {
      const dataArray = fd.toString().split("\n");
      data = dataArray;
    });
    let existe = false;
    for(usuario of data){
      let datos = data.split(";")
      if(datos[0] === user && datos[1] === pass){
        existe = true;
        return;
      }
    }
    console.log(existe)
    if (existe === true) {
      res.send(JSON.stringify({ exist: true }));
    } else {
      res.send(JSON.stringify({ exist: false }));
    }
  } catch (error) {
    res.send(JSON.stringify({ exist: false }));
  }
});

app.post("/decodificarFraseS", (req, res) => {
    const frase = req.body.frase.split(",");
    const dataSecreta = buscarID(frase[0]);
    const fraseSecreta = dataSecreta.split(",")[1];
    const fraseDesencriptada = desencriptar(fraseSecreta, frase[1]);
    fraseDes = fraseDesencriptada;
    res.send("la frase desencriptada ha sido guardada y desencriptada");
});

app.post("/guardarFrase", (req, res) => {
  fraseEn = req.body.frase;
  res.send("la frase desencriptada ha sido guardada y desencriptada");
});
/**
 * decodificarFrase
 * @param {object} req - Request del cliente, que incluye la frase.
 * @param {object} res - Response a enviar al cliente
 */
app.post("/decodificarFrase", (req, res) => {
  try {
    const fraseSecret = req.body.frase.split(",");
    const fraseSecreta = fraseSecret[1];
    const frase = fraseEn.split(",")[1];
    const fraseDesencriptada = desencriptar(fraseSecreta, frase);
    fraseDes = fraseDesencriptada;
    res.send("la frase desencriptada ha sido guardada y desencriptada");
  } catch (error) {
    console.log(`Un error ha ocurrido. Detalles ${JSON.stringify(error)}`);
  }
});

app.get("/fraseDecodificada", (req, res) => res.send(fraseDes));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const server = app.listen(0, ()=>{ // En caso de necesitar apertura de servidor con un puerto random.
//     const {port} = server.address()  //destructuracion de objeto
//     console.log(`Server listening on port: ${port}, serving on http://localhost:${port}`); // Server listening on port XXXXX
// });


//Código para el login
app.get("/loginCheckout", (req, res) => {  //Lee el archivo frasesCodificadas
    fs.readFile("./controllers/frasesCodificadas.txt", (err, fd) => {  //Se especifica la ruta del archivo txt
    if (err) throw err; //Si esque existe un error, lo retorna
    const dataArray = fd.toString().split("\n"); //fd es lo obtenido del txt, lo conviertes a string y se separa con saltos de linea
    dataArray.pop(); //Elimina el ultimo salto de linea, sin este codigo se creará un botón sin texto, vacío
    res.send(JSON.stringify(dataArray)); //Muestra la frase en el front
    });
});