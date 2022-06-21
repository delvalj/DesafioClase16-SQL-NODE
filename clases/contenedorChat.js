// DESAFIO CLASE 16 SQL

const Knex = require('knex').default;
const moment = require('moment');

//Conección con SQLite
const knexSQLite = Knex({
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.sqlite' },
    useNullAsDefault: true
})

const fechaActual = moment();
const fechaformateada = fechaActual.format("DD/MM/YYYY HH:MM:SS");

module.exports = class ContenedorChat {
    constructor(options, tabla) {
        this.knex = Knex(options);
        this.tabla = tabla;
    }

    /**
     * Metodo para guardar un producto. Al terminar de grabar, muestra por pantalla el ID del producto agregado.
     * @param message
     */

    async saveMessage(message) {
        await knexSQLite('mensajes').insert({author: message.author, text: message.text, date: fechaformateada});
        // console.log(message);
    }

    /**
     * Metodo para obtener todos los mensajes
     */
    async readMessage() {
        try {
            let contenido = await knexSQLite.select('*').from('mensajes');
            if (contenido === '') {
                return '';
            } else {
                // console.log(contenido)
                return contenido;
            }
        } catch (error) {
            console.log("Error en getAll", error);
            return [];
        }
    }

}


