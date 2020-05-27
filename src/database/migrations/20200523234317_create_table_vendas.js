
exports.up = knex =>
    knex.schema.createTable('vendas', table => {
        table.increments('id')
        table.integer('comprador_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.integer('vendedor_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onDelete('CASCADE')
        table.integer('produto_id')
            .references('id')
            .inTable('produtos')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.float('preco').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })

exports.down = knex => knex.schema.dropTable('vendas')
