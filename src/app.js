const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World',
        version: '1.0.0'
    })
})

module.exports = app