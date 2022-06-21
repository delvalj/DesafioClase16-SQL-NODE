const Knex = require('knex').default;

const optionsMySQL = {
    host: "localhost",
    user: "root",
    port: "3306",
    password: "",
    database: "ecommerce"
};

const knex = Knex({
    client: 'mysql2',
    connection: optionsMySQL
});

const ejecutar = async () => {
    await knex.schema.dropTableIfExists("articulos");
    await knex.schema.createTable("articulos", (table) => {
        table.increments("id").primary().notNullable();
        table.string("titulo", 80).notNullable();
        table.float("price").notNullable();
        table.string("thumbnail", 250).notNullable();
        table.integer('code').notNullable();

    });

    await knex("articulos").insert([
        {titulo: "Producto precargado 1", price: 9.99, thumbnail: `http://example1.com` , code: 2251628},
        {titulo: "Producto precargado 2", price: 8.88, thumbnail: `http://example2.com`, code: 2251667},
    ]);

    console.log(await knex.from("articulos").select("*"));

    await knex.destroy()
}

ejecutar();
