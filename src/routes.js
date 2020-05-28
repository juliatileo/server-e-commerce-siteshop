const express = require('express')
const routes = express.Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const UserController = require('./controllers/UserController')
const ProdutosController = require('./controllers/ProdutosController')
const VendasController = require('./controllers/VendasController')
const CarrinhoController = require('./controllers/CarrinhoController')

// Users

routes.get('/users', UserController.getUsers)
routes.get('/users/:id', UserController.getUser)
routes.get('/login', UserController.login)
routes.post('/users', multer(multerConfig).single('profpic'), UserController.createUser)
routes.put('/users/:id', multer(multerConfig).single('profpic'), UserController.updateUser)
routes.put('creditos/:id', UserController.ganharCreditos)

// Produtos

routes.get('/produtos', ProdutosController.getProdutos)
routes.get('/produtos/:id', ProdutosController.getProduto)
routes.post('/produtos/:id', multer(multerConfig).single('imagem'), ProdutosController.createProduto)
routes.delete('/produtos/:id', ProdutosController.deleteProduto)

// Vendas

routes.get('/vendas/:id', VendasController.getVendas)
routes.post('/vendas', VendasController.createVenda)

// Carrinho

routes.get('/carrinhos/:id', CarrinhoController.getCarrinho)
routes.post('/carrinhos', CarrinhoController.createCarrinho)
routes.delete('/carrinhos/:id', CarrinhoController.deleteCarrinho)

module.exports = routes