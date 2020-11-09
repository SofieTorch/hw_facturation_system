const { jsPDF } = require("jspdf");
const fs = require('fs')

const facturaCtrl = {}

facturaCtrl.facturas = new Array()

facturaCtrl.createFactura = (req, res) => {
    res.writeHead(200, {'Content-Type':'application/json'})
    facturaCtrl.facturas.push(req.body)
    res.end(`{"id": ${facturaCtrl.facturas.length}}`)
}

facturaCtrl.getNroFactura = (req, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'})
    res.end(`${ facturaCtrl.facturas.length }`)
}

facturaCtrl.getFacturas = (req, res) => {
    res.writeHead(200, {'Content-type':'application/json'})
    res.end(JSON.stringify(facturaCtrl.facturas))
}

facturaCtrl.anularFactura = (req, res) => {
    res.writeHead(200, {'Content-type':'text/plain'})
    facturaCtrl.facturas[req.params.nroFactura - 1].estado = 'anulada'
    res.end('Ok')
}

facturaCtrl.printFactura = (req, res) => {
    res.writeHead(200, {'Content-type': 'application/pdf'})
    let factura = facturaCtrl.facturas[req.params.nroFactura - 1]
    let format = formatFactura(factura)
    
    let pdf = new jsPDF()
    pdf.setFontSize(14)
    pdf.text(format, 25, 25)
    pdf.save(`static/facturas/${factura.nro}${factura.fecha}.pdf`)

    let facturaPdf = fs.readFileSync(`static/facturas/${factura.nro}${factura.fecha}.pdf`)
    res.end(facturaPdf)
}

const formatFactura = (factura) => {
    
    let facturaDetailFormat = ``
    factura.detalle.forEach(product => {
        facturaDetailFormat +=
        `\t${ product.producto }       Cantidad: ${ product.cantidad }\n` +  
        `\tPrecio unitario: ${ product.precioUnitario }          Subtotal: ${ product.subtotal }\n` +
        `\t----------------------------------------------------------\n`
    })

    let facturaFormat =
    `EMPRESA PATITO S.R.L.\n`+
    `NIT: 2415479010

    Fecha: ${ factura.fecha }
    Factura Nro.: ${ factura.nro }
    Nro. Autorización: 416301900218677
    ${ factura.estado == 'anulada' ? '\nFactura anulada\n' : '' }
    Nit: ${ factura.nit }
    Razón social: ${ factura.razonSocial }
    Glosa: ${ factura.glosa }

    DETALLE:\n` +
    `\n${ facturaDetailFormat }`

    return facturaFormat
}

module.exports = facturaCtrl
