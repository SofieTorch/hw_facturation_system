const productCtrl = {}

productCtrl.products = require('../collections/product.collection')

productCtrl.getProducts = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(productCtrl.products))
}

productCtrl.createProduct = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    productCtrl.products.push(req.body)
    res.end('Ok')
}

module.exports = productCtrl
