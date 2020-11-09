app.service('DetailService', function() {
    let detailService = {}

    detailService.cart = new Array()

    detailService.addProduct = (product) => detailService.cart.push(product)
    detailService.getCart = () =>  detailService.cart
    detailService.removeProduct = (index) => detailService.cart.splice(index, 1)
    detailService.clearCart = () => detailService.cart = new Array()

    return detailService
})
