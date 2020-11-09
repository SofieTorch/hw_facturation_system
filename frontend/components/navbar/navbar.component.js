app.component('navbar', {
    templateUrl: './components/navbar/navbar.component.html',
    controller: 'navbarCtrl'
})

app.controller('navbarCtrl', function($scope, $rootScope) {

    $scope.createFactura = () => {
        let elementsD = Array.from(document.getElementsByClassName('to-disable'))
        elementsD.forEach(element => element.removeAttribute('disabled'))
        let elementsE = Array.from(document.getElementsByClassName('to-enable'))
        elementsE.forEach(element => element.setAttribute('disabled', true))
        let btnFloating = document.querySelector('.btn-floating')
        btnFloating.className = 'btn-floating btn-large halfway-fab waves-effect waves-light cyan lighten-2 to-enable disabled'

        $rootScope.$broadcast('clearAll')
    }

})