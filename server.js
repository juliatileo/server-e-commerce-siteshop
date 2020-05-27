const express = require('express')

const app = express()

const routes = require('./src/routes')
app.use(express.json())
app.use(routes)
app.use(express.static('src/uploads'))
app.use((request, response, next) => {
    response.header('Acess-Controll-Allow-Origin', '*')
    response.header('Acess-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})
app.use((error, request, response, next) => {
    response.status(error.status || 500)
    response.json({ error: error.message })
})
app.listen(3001, () => console.log('Rodando'))