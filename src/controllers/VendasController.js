const knex = require('../database')

module.exports = {
    async getVendas(req, res, next) {
        try {
            const { id } = req.params
            const venda = await knex('vendas').join('users as comprador', 'comprador.id', '=', 'vendas.comprador_id').join('users as vendedor', 'vendedor.id', '=', 'vendas.vendedor_id').select('vendas.*', 'comprador.nome as comprador_nome', 'vendedor.nome as vendedor_nome').where('comprador_id', id).orWhere('vendedor_id', id).orderBy('created_at', 'desc')
            return res.status(200).json(venda)
        } catch (err) {
            next(err)
        }
    },
    async createVenda(req, res, next) {
        try {
            const { comprador_id, produto_id, vendedor_id, carrinho_id, preco } = req.body
            const comprador_data = await knex('users').select('users.creditos', 'users.compras').where('id', comprador_id)
            const vendedor_data = await knex('users').select('users.creditos', 'users.vendas').where('id', vendedor_id)
            const perda_comprador = comprador_data[0].creditos - preco
            const lucro_vendedor = vendedor_data[0].creditos + preco
            const compras = comprador_data[0].compras + 1
            const vendas = vendedor_data[0].vendas + 1
            const carrinho = await knex('carrinhos').del().where('id', carrinho_id)
            const venda = await knex('vendas').insert({ comprador_id, produto_id, vendedor_id, preco })
            const comprador = await knex('users').where('id', comprador_id).update({ creditos: perda_comprador, compras })
            const vendedor = await knex('users').where('id', vendedor_id).update({ creditos: lucro_vendedor, vendas })
            return res.status(201).json({ comprador_id, produto_id, vendedor_id, preco, comprador_data, vendedor_data })
        } catch (err) {
            next(err)
        }
    }
}