// DESAFIO CLASE 16 SQL
const Knex = require('knex').default;

//Conección con SQLite
const optionsSqlite = Knex({
    client: 'sqlite3',
    connection: {filename: './DB/ecommerce.sqlite'},
    useNullAsDefault: true
})


module.exports = class ContenedorChat {
    constructor(options, tabla) {
        this.knex = Knex(optionsSqlite);
        this.tabla = tabla;
    }

    /**
     * @param {json} producto
     * Metodo para guardar un producto. Al terminar de grabar, muestra por pantalla el ID del producto agregado.
     */
    async metodoSave(producto) {
        await this.knex('mensajes').insert([
            {author: producto.author, text: producto.text, date: producto.date}]);
    }

    /**
     * Metodo para obtener todos los productos
     */
    async getAll() {
        try {
            const contenido = await this.knex.select('*').from(this.tabla);
            console.log(contenido);
            return contenido;
        } catch (error) {
            console.log("Error en getAll", error);
            return [];
        }
    }
}

