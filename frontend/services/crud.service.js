app.service('CrudService', function($http) {
    let crudService = {}

    crudService.getCollection = (type) => {
        return $http({
            url: `http://localhost:3000/api/${type}`,
            method: 'GET'
        })
    }

    crudService.getClient = (nit) => {
        return $http({
            url: `http://localhost:3000/api/clients/${nit}`,
            method: 'GET'
        })
    }

    crudService.registerData = (type, data) => {
        return $http({
            url: `http://localhost:3000/api/${type}`,
            method: 'POST',
            data: JSON.stringify(data)
        })
    }

    crudService.getNroFactura = () => {
        return $http({
            url: 'http://localhost:3000/api/facturas/nro',
            method: 'GET'
        })
    }

    crudService.anularFactura = (nroFactura) => {
        return $http({
            url: `http://localhost:3000/api/facturas/anular/${nroFactura}`,
            method: 'PATCH'
        })
    }

    crudService.printFactura = (nroFactura) => {
        return $http({
            url: `http://localhost:3000/api/facturas/imprimir/${nroFactura}`,
            method: 'GET'
        })
    }

    return crudService
})
