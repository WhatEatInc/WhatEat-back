const app = require('./app')
require('dotenv').config()

app.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log('Server running on port', process.env.PORT)
})