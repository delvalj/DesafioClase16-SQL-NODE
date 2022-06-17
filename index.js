const express = require("express");
const app = express();
const {engine} = require("express-handlebars");
const PORT = process.env.PORT || 8080;

const { routerProducto } = require('./routerProd');

const messages = [];

const {Server: HttpServer} = require('http');
// const {Server: SocketServer} = require('socket.io');

const httpServer = new HttpServer(app);
// const socketServer = new SocketServer(httpServer);


// ------------------------ // CODIGO DEL SERVER  // ---------------- // ---------------- // ---------------- // ---------------- //

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


// CH A T
// socketServer.on('connection', (socket) => {
//     socket.emit('messages', messages);
//
//     socket.on('new_message', (mensaje) => {
//         messages.push(mensaje);
//         socketServer.sockets.emit('messages', messages);
//     });
//
// });
httpServer.listen(PORT, () => {
    console.log(`Corriendo server en el puerto ${PORT}!`);
});
