const express = require('express')

const app = express()

app.listen(3001)

console.log('Rodando')

app.get('/teste', (req, res) => {
    return res.status(200).send({troxa: 'dsafdaf'})
})