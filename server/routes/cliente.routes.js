const express = require('express')
const router = express.Router()

const clienteCtrl = require('../controllers/cliente.controller')

router.get('/:nit', clienteCtrl.getClient)
router.post('/', clienteCtrl.createClient)

module.exports = router
