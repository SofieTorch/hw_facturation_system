const express = require('express')
const fs = require('fs')
const app = express()

const index = fs.readFileSync('frontend/index.html')

// Settings
app.set('port', process.env.PORT || 3000)
app.use(express.static('frontend'))
app.use(express.static('static'))

// Middlewares
app.use(express.json())

// Routes
app.use('/api/facturas', require('./routes/factura.routes'))
app.use('/api/products', require('./routes/product.routes'))
app.use('/api/clients', require('./routes/cliente.routes'))

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    res.end(index)
})

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
})


