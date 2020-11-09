app.component('productsList', {
    templateUrl: './components/products-list/products-list.component.html',
    controller: 'productsListCtrl'
})

app.controller('productsListCtrl', function($scope, CrudService, DetailService) {

    $scope.products = new Array()
    $scope.product = new Product()

    angular.element(document).ready( () => loadProducts() )

    $scope.selectProduct = (index) => {
        clearTable()
        $scope.product = $scope.products[index]
        $scope.product.cantidad = 0
        let records = Array.from(document.getElementsByTagName('tr'))
        let record = records[index + 1]
        record.className = "cyan lighten-4"
        $scope.verifyState()
    }

    $scope.addProduct = () => {
        $scope.product.subtotal = $scope.product.precioUnitario * $scope.product.cantidad
        DetailService.addProduct($scope.product)
        $scope.clearProduct()
    }

    $scope.clearProduct = () => {
        $scope.product = new Product()
        clearTable()
        $scope.verifyState()
    }

    $scope.verifyState = () => {
        let submitbtn = document.getElementById('productSubmit')
        if($scope.product.cantidad > 0 && $scope.product.producto) {
            submitbtn.removeAttribute('disabled')
        } else {
            submitbtn.setAttribute('disabled', true)
        }
    }

    const loadProducts = () => {
        CrudService.getCollection('products').then( (res) => $scope.products = res.data )
    }

    const clearTable = () => {
        let records = Array.from(document.getElementsByTagName('tr'))
        records.forEach(rec => rec.className = undefined)
    }

})
