const clientCtrl = {}

clientCtrl.clients = require('../collections/client.collection')

clientCtrl.getClient = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    let client = clientCtrl.clients.find(client => client.nit == req.params.nit)
    res.end(JSON.stringify(client))
}

clientCtrl.createClient = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    clientCtrl.clients.push(req.body)
    res.end('Ok')
}

module.exports = clientCtrl
