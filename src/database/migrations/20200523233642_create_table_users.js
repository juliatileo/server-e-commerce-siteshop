
exports.up = knex =>
    knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('nome').notNullable()
        table.string('email').notNullable()
        table.string('senha').notNullable()
        table.float('creditos')
        table.string('profpic').notNullable()
        table.integer('compras')
        table.integer('vendas')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })

exports.down = knex => knex.schema.dropTable('users')
