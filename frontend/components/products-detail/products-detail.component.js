app.component('productsDetail', {
    templateUrl: './components/products-detail/products-detail.component.html',
    controller: 'productsDetailCtrl'
})

app.controller('productsDetailCtrl', function($scope, DetailService) {
    
    $scope.products = DetailService.getCart()

    $scope.removeProduct = (index) => {
        DetailService.removeProduct(index)
    }

    $scope.$on('clearAll', () => {
        DetailService.clearCart()
        $scope.products = DetailService.getCart()
    })

})

