const knex = require('../database')
const url = require('../url')

module.exports = {
    async getUsers(req, res, next) {
        try {
            const results = await knex('users').orderBy('id', 'desc')
            return res.json(results)
        } catch (err) {
            next(err)
        }
    },
    async getUser(req, res, next) {
        const { id } = req.params

        try {
            const results = await knex('users').where({ id })
            return res.status(200).json(results)
        } catch (err) {
            next(err)
        }
    },
    async createUser(req, res, next) {
        const { nome, email, senha } = req.body
        const creditos = 1000
        const compras = 0
        const vendas = 0
        const profpic = `${url}/${req.file.filename}`
        try {
            const validation = await knex('users').where({ email })
            if (validation.length != 0)
                return res.status(400).json({ Erro: 'Usuário já existe' })
            const user = await knex('users').insert({ nome, email, senha, creditos, profpic, compras, vendas })
            return res.status(201).json({ nome, email, senha, creditos, profpic, compras, vendas })
        } catch (err) {
            next(err)
        }
    },
    async updateUser(req, res, next) {
        const { nome, email, senha } = req.body
        const profpic = `${req.file.filename}`
        const { id } = req.params

        try {
            const validation = await knex('users').where({ email })
            if (validation.length != 0) {
                return res.status(400).json({ Erro: 'Usuário já existe' })
            }
            const user = await knex('users').update({ nome, email, senha, profpic }).where({ id })
            return res.status(200).json({ nome, email, senha, profpic })
        } catch (err) {
            next(err)
        }
    },
    async login(req, res, next) {
        const { email } = req.body

        try {
            const user = await knex('users').where('email', email)
            if (user.length != 0)
                return res.status(200).json(user)
            return res.status(400).json({ Erro: 'Usuário não existe' })
        } catch (err) {
            next(err)
        }
    }
}