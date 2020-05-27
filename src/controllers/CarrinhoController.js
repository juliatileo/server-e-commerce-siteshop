const knex = require('../database')

module.exports = {
    async getCarrinho(req, res, next) {
        try {
            const { id } = req.params
            const carrinho = await knex('carrinhos').where('user_id', id).orderBy('created_at', 'desc')
            return res.status(200).json(carrinho)
        } catch (err) {
            next(err)
        }
    },
    async createCarrinho(req, res, next) {
        try {
            const { user_id, produto_id } = req.body
            const validation = await knex('carrinhos').where('produto_id', produto_id)
            if (validation.length != 0)
                return res.status(400).json({ Erro: 'Produto já está no carrinho' })
            const carrinho = await knex('carrinhos').insert({ user_id, produto_id })
            return res.status(201).json({ user_id, produto_id })
        } catch (err) {
            next(err)
        }
    },
    async deleteCarrinho(req, res, next) {
        try {
            const { id } = req.params
            const carrinho = await knex('carrinhos').where({ id }).del()
            return res.status(200).json({ Sucesso: `Carrinho ${id} deletado` })
        } catch (err) {
            next(err)
        }
    }
}