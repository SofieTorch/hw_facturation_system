const express = require('express')
const router = express.Router()

const facturaCtrl = require('../controllers/factura.controller')

router.post('/', facturaCtrl.createFactura)
router.get('/nro', facturaCtrl.getNroFactura)
router.get('/', facturaCtrl.getFacturas)
router.patch('/anular/:nroFactura', facturaCtrl.anularFactura)
router.get('/imprimir/:nroFactura', facturaCtrl.printFactura)

module.exports = router
