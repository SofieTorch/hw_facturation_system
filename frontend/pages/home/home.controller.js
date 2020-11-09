app.controller('homeCtrl', function($scope, DetailService, CrudService) {

    $scope.factura = new Factura()
    $scope.facturaAnulada = false

    $scope.alert = {
        showAlert: false,
        content: '',
        class: 'alert-danger'
    }

    angular.element(document).ready(() => getNroFactura())

    $scope.grabarFactura = () => {
        $scope.factura.detalle = DetailService.getCart()

        if($scope.factura.detalle.length > 0) {

            $scope.factura.estado = 'valido'
            $scope.factura.fecha = Date.now()

            CrudService.registerData('facturas', $scope.factura)
            .then((res) => {
                changeAlert('La factura se ha grabado exitosamente.', 'success')
                disableElements('.to-disable', false)
                disableElements('.to-enable', true)
                let btnFloating = document.querySelector('.btn-floating')
                btnFloating.className = 'btn-floating btn-large halfway-fab waves-effect waves-light cyan lighten-2 to-enable'
            })
        }
        else {
            changeAlert('Debe registrar al menos 1 producto para grabar la factura', 'warning')
        }
    }


    $scope.findClient = () => {
        CrudService.getClient($scope.factura.nit).then((res) => {
            if(res.data) {
                $scope.factura.razonSocial = res.data.razonSocial
                disableElements('.register-client', false)
            }
            else {
                changeAlert('Cliente no encontrado. Por favor revise los datos o registre al cliente.', 'danger')
                $scope.factura.razonSocial = undefined
                disableElements('.register-client', true)
            }
        })
    }

    $scope.registerClient = () => {
        CrudService.registerData('clients', new Client($scope.factura.nit, $scope.factura.razonSocial))
        .then((res) => {
            changeAlert('Cliente registrado exitosamente', 'success')
            disableElements('.register-client', false)
        })
    }

    $scope.printFactura = () => {
        CrudService.printFactura($scope.factura.nro).then((res) => {
            window.open(`http://localhost:3000/api/facturas/imprimir/${$scope.factura.nro}`, '_blank');
        })
    }

    $scope.anularFactura = () => {
        CrudService.anularFactura($scope.factura.nro).then((res) => {
            changeAlert('La factura se anuló exitosamente.', 'warning')
            $scope.facturaAnulada = true
        })
    }


    $scope.$on('clearAll',() => {
        $scope.factura = new Factura()
        $scope.facturaAnulada = false
        getNroFactura()
    })


    const disableElements = (querySelector, enable) => {
        let elements = Array.from(document.querySelectorAll(querySelector))
        if (enable) {
            elements.forEach(element => element.removeAttribute('disabled'))
        } else {
            elements.forEach(element => element.setAttribute('disabled', true))
        }
    }


    const changeAlert = (content, classType) => {
        $scope.alert.content = content
        $scope.alert.class = `alert-${classType}`
        $scope.alert.showAlert = true
    }

    
    const getNroFactura = () => CrudService.getNroFactura().then((res) => $scope.factura.nro = +res.data+1 )

})
