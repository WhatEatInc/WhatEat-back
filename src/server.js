const app = require('./app')

app.listen(8080, (err) => {
    if (err) throw err
    console.log('Server running on port', 8080)
})