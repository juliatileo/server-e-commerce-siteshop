
exports.up = knex =>
    knex.schema.createTable('carrinhos', table => {
        table.increments('id')
        table.integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.integer('produto_id')
            .references('id')
            .inTable('produtos')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            table.timestamp('created_at').defaultTo(knex.fn.now())
    })

exports.down = knex => knex.schema.dropTable('carrinhos')
