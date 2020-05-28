const knex = require('../database')
const url = require('../url')

module.exports = {
    async getProdutos(req, res, next) {
        try {
            const produto = await knex('produtos').join('users', 'users.id', '=', 'produtos.user_id').select('produtos.*', 'users.nome as username').orderBy('produtos.id', 'desc')
            return res.json(produto)
        } catch (err) {
            next(err)
        }
    },
    async getProduto(req, res, next) {
        try {
            const { id } = req.params
            const produto = await knex('produtos').join('users', 'users.id', '=', 'produtos.user_id').select('produtos.*', 'users.nome as username').where('produtos.id', id)
            return res.status(200).json(produto)
        } catch (err) {
            next(err)
        }
    },
    async createProduto(req, res, next) {
        try {
            const { nome, preco, maxparcelas } = req.body
            const imagem = `${url}/${req.file.filename}`
            const user_id = req.params.id

            const produto = await knex('produtos').insert({ nome, preco, imagem, user_id, maxparcelas })
            return res.status(201).json({ nome, preco, imagem, user_id, maxparcelas })
        } catch (err) {
            next(err)
        }
    },
    async deleteProduto(req, res, next) {
        try {
            const { id } = req.params
            const produto = await knex('produtos').del().where({ id })
            return res.status(200).json({ sucesso: `Produto ${id} deletado` })
        } catch (err) {
            next(err)
        }
    }
}