angular
    .module('app.core', ['ngRoute'])
    .config(config);

function config($routeProvider, $locationProvider) {

    $routeProvider

        // route for the info page
        .when('/info/', {
            templateUrl : 'partials/info.html',
            controller  : 'InfoCtrl',
            controllerAs: 'info'
        })
        .otherwise({ redirectTo: '/main' });

    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
}
