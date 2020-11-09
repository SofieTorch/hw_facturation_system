var app = angular.module('app', ['ngRoute'])

app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: './pages/home/home.html',
            controller: 'homeCtrl'
        })
})
