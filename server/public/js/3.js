alert('more');
angular.module('app')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(false).hashPrefix('');
        $urlRouterProvider.otherwise('/app/home');
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'tpl/layout.html'
            })
            .state('app.home', {
                url: '/home',
                template: 'home...'
            })
            .state('app.about', {
                url: '/about',
                template: 'about...'
            })
            .state('app.more', {
                url: '/more',
                template: 'more...'
            });
        alert('more...');
    }]);