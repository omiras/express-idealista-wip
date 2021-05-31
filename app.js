const pisos = [{
    id: 1,
    titulo: 'Casa Rústica',
    foto: 'https://i.picsum.photos/id/1008/5616/3744.jpg?hmac=906z84ml4jhqPMsm4ObF9aZhCRC-t2S_Sy0RLvYWZwY',
    precio: 500,
    ubicacion: 'Girona'
}, {
    id: 2,
    titulo: 'Palacete',
    foto: 'https://i.picsum.photos/id/101/2621/1747.jpg?hmac=cu15YGotS0gIYdBbR1he5NtBLZAAY6aIY5AbORRAngs',
    precio: 800,
    ubicacion: 'Barcelona'
}]

const path = require('path')

// requerir el módulo de terceros Express
const express = require('express');

// tenemos que ejecutar la función importada para obtener un objeto del tipo Express
const app = express();

// .set es un método que permite confgiurar nuestro servidor. 
// "pon la variable 'view engine' con el valor 'ejs' " <--> A partir de ahora, mi aplicación Express va a utilizar el motor de plantillas EJS. IMPORTANTE! Tenemos que tener instalado 'ejs' con npm para que esto funcione!

app.set('view engine', 'ejs');

// Queremos que express nos informe de los datos pasados mediante POST en el cuerpo del mensaje
app.use(express.urlencoded({ extended: false }))

// damos accesp a la carpeta 'public' para que cualquier cliente pueda hacer un GET a cualquier recurso que se ubique en ella (hojas de estilo CSS, imágenes, documentos PDF...)
app.use(express.static('public'));

// Vamos a crear un endpoint, que cuando nos hagan un GET al directorio raiz de nuestra aplicación; mostramos la HOME PAGE de nuestro portal inmobiliario
app.get('/', (req, res) => {
    console.log(req)
    //Devolvemos una respuesta al cliente
    res.send(`<h1>Bievenido a Ideatonta, tu portal de confianza.</h1>`)

    // Se acabaron los res.end !
});

// Definimos un endpoint para mostrar el listado de pisos. El endpoint será '/pisos'; que al hacer un GET, devolvera, textualmente, los pisos disponibles en la base de datos
app.get('/pisos', (req, res) => {

    // Obtener la querystring
    const precio = req.query.precio;
    let pisosFiltrados = pisos;

    if (precio) {
        pisosFiltrados = pisos.filter(piso => piso.precio <= precio);
        console.log("Pisos Filtrados: ", pisosFiltrados)
    }

    res.send(pisosFiltrados);
})

app.get('/buscar', (req, res) => {
    res.render('buscador')
})

app.get('/nuevo-piso', (req, res) => {

    // La mayoría de lenguajes de programación, tienen variables globales que nos permiten saber en que directorio se está ejecutando nuestra aplicación
    console.log(__dirname);
    console.log(__filename);

    //disponemos del método sendFile para enviar un fichero al cliente. Para poder enviar un fichero, necesiamos la ruta absoluta desde la raiz de nuestro sistema de fichero hasta el fichero que queremos enviar 
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

app.get('/mostrar-pisos', (req, res) => {
    // Esto nos va a renderizar la plantilla index.ejs. No es necesario poner views/index; porque por defecto siempre Express irá a buscar los archivos que queremos renderizar a la carpeta 'views'. Además, tampoco hace falta poner la extensión; porque ya hemos definido que nuestro motor de plantillas es EJS. 
    res.render('index', {
        totalPisos: pisos.length,
        todosLosPisos: pisos
    });
})

app.get('/piso/:idPiso', (req, res) => {
    console.log("Id del piso del que quiero conocer información: ", req.params.idPiso) // express automáticamente nos pone tantos campo-valor en el objeto 'params' como parámetros dinámicos establezcamos para este endpoint

    // Como hacemos para recuperar el elemento del array cuyo 'id' es 'idPiso' ? Mostrar por consola el objeto cuyo id sea exactamente igual a 'idPiso'.
    const idPiso = req.params.idPiso;

    
    const piso = pisos.find(pisoCandidato => pisoCandidato.id == idPiso);
    console.log(piso) 

    // Manera 1: bucle. Buscar un objeto en concreto dentro de una lista de objetos
    let encontrado = false;
    let i = 0;

    while (!encontrado && i < pisos.length) {
        if (pisos[i].id == idPiso) {
            encontrado = true;
        }
        else {
            i++;
        }
    }

        return res.render('detalle-piso', {
            piso: piso
        });


    // Método 2: usar el método find de los datos de tipo array
    // Vamos a buscar un elemento del array pisos cuyo 'id' sea el mismo que 'idPiso'


})


app.listen(3000);