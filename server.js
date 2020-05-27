const express = require('express')
const app = express()
const cors = require('cors')

const routes = require('./src/routes')
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(express.static('src/uploads'))
app.use((error, request, response, next) => {
    response.status(error.status || 500)
    response.json({ error: error.message })
})
app.listen(process.env.PORT || 3001, () => console.log('Rodando'))