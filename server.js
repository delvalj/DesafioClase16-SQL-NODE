const express = require("express");
const app = express();
const {engine} = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const { routerProducto } = require('./routers/routerProd');

const {Server: HttpServer} = require('http');
const {Server: SocketServer} = require('socket.io');
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);


const messages = [];

const Knex = require('knex').default;


// Middleware para parsear el Body. Sin esto no obtenemos el Body. SIEMPRE QUE USAMOS POST HAY QUE USARLO.
// El body llega como strings. Lo que hace el middleware es transformarlo en JSON y mandarlo a la funcion que debe controlarlo.
app.use(express.json());
// Hace lo mismo pero con dato de formularios. Un form en HTML viene en forma de URL encoded y esto lo trasnforma en formulario.
app.use(express.urlencoded({extended: true}));

// Va a buscar en la carpeta PUBLIC si existe el archivo buscado.
app.use(express.static("public"));

// Router
app.use("/", routerProducto);

// Views Engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
    })
);

app.set("views", "./hbs_views");
app.set("view engine", "hbs");


//Conección con SQLite

const knexSQLite = Knex({
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.sqlite' },
    useNullAsDefault: true
})

// metodos para clase cchat
const saveMessage = async (message) => {
    // await knexSQLite('mensajes').insert({author: message.author , text: message.text});
    await knexSQLite('mensajes').insert({author: message.author, text: message.text, date: 'fechaformateadax2'});
}

const readMessage = async () => {
    let contenido = await knexSQLite.select('*').from('mensajes');
    if (contenido === '') {
        return '';
    } else {
        return contenido;
    }
}


// CH A T
socketServer.on('connection', async (socket) => {
    socket.emit('messages', await  readMessage());

    socket.on('new_message',async (mensaje) => {
        console.log(mensaje);
        saveMessage(mensaje);
        let mensajes = await readMessage();
        socketServer.sockets.emit('messages',mensajes);
    });

    // socket.on('new_message', async (message) => {
    //     saveMessage(message);
    //     let messages = await readMessage();
    //     socketServer.sockets.emit('messages', messages);
    // });

});
httpServer.listen(PORT, () => {
    console.log(`Corriendo server en el puerto ${PORT}!`);
});
