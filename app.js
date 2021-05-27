const pisos = [{
    titulo: 'Casa Rústica',
    precio: 500
}, {
    titulo: 'Palacete',
    precio: 800
}]

const path = require('path')

// requerir el módulo de terceros Express
const express = require('express');

// tenemos que ejecutar la función importada para obtener un objeto del tipo Express
const app = express();

// Queremos que express nos informe de los datos pasados mediante POST en el cuerpo del mensaje
app.use(express.urlencoded({ extended: false}))

// damos accesp a la carpeta 'public' para que cualquier cliente pueda hacer un GET a cualquier recurso que se ubique en ella (hojas de estilo CSS, imágenes, documentos PDF...)
app.use(express.static('public'));

// Vamos a crear un endpoint, que cuando nos hagan un GET al directorio raiz de nuestra aplicación; mostramos la HOME PAGE de nuestro portal inmobiliario
app.get('/', (req, res)=>{  
    console.log(req)
    //Devolvemos una respuesta al cliente
    res.send(`<h1>Bievenido a Ideatonta, tu portal de confianza.</h1>`)

    // Se acabaron los res.end !
});

// Definimos un endpoint para mostrar el listado de pisos. El endpoint será '/pisos'; que al hacer un GET, devolvera, textualmente, los pisos disponibles en la base de datos
app.get('/pisos', (req, res)=> {

    // Obtener la querystring
    const precio = req.query.precio;
    let pisosFiltrados = pisos;

    if (precio) {
        pisosFiltrados = pisos.filter( piso => piso.precio <= precio);
        console.log("Pisos Filtrados: ", pisosFiltrados)
    }
    
    res.send(pisosFiltrados);
}) 

app.get('/buscar', (req, res)=> {
    
    // La mayoría de lenguajes de programación, tienen variables globales que nos permiten saber en que directorio se está ejecutando nuestra aplicación
    console.log(__dirname);
    console.log(__filename);

    //disponemos del método sendFile para enviar un fichero al cliente. Para poder enviar un fichero, necesiamos la ruta absoluta desde la raiz de nuestro sistema de fichero hasta el fichero que queremos enviar 

    //Para construir la ruta absoluta, usaremos path.join
    const ruta = path.join(__dirname, 'html', 'buscador.html')
    console.log("ruta: ", ruta)

    res.sendFile(ruta);
})

app.get('/nuevo-piso', (req, res) => {
    const ruta = path.join(__dirname, 'html', 'nuevopiso.html')
    console.log("ruta: ", ruta)

    res.sendFile(ruta);
})

app.post('/nuevo-piso', (req, res) => {
    
    const titulo = req.body.titulo; // obtenemos el campo 'titulo' del formulario 
    const precio = req.body.precio; // obtenemos el cmapo 'precio' del formulario

    // añadimos el piso a la "base de datos" de pisos
    pisos.push({
        titulo: titulo,
        precio: precio
    })

    res.redirect('/pisos'); // haz una petición GET a '/pisos'
})


app.listen(3000);