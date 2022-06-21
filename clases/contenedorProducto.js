// DESAFIO CLASE 16 SQL
const Knex = require('knex').default;

module.exports = class Contenedor {
    constructor(options, tabla) {
        this.knex = Knex({
            client: 'mysql2',
            connection: options
        });
        this.tabla = tabla;
    }
    /**
     * @param {json} producto
     * Metodo para guardar un producto. Al terminar de grabar, muestra por pantalla el ID del producto agregado.
     */
    async metodoSave(producto) {
        await this.knex('articulos').insert({
            titulo: producto.title,
            thumbnail: producto.thumbnail,
            price: producto.price,
            code: producto.code
        })
    }
    /**
     * Metodo para obtener todos los productos
     */
    async getAll() {
        try {
            return await this.knex.select('*').from(this.tabla);
        } catch (error) {
            console.log("Error en getAll", error);
            return [];
        }
    }
}

