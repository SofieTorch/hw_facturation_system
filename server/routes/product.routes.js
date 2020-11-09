const express = require('express')
const router = express.Router()

const productCtrl = require('../controllers/product.controller')

router.get('/', productCtrl.getProducts)
router.post('/', productCtrl.createProduct)

module.exports = router
