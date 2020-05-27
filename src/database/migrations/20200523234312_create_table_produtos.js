
exports.up = knex =>
    knex.schema.createTable('produtos', table => {
        table.increments('id')
        table.string('nome').notNullable()
        table.float('preco').notNullable()
        table.string('imagem').notNullable()
        table.integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.integer('maxparcelas').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })

exports.down = knex => knex.schema.dropTable('produtos')
