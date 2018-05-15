angular.module("app", [
        'ui.router',
        'ui.router.state.events'
    ])
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
    }])
    .controller('AppController', ['$scope', '$http', function($scope, $http) {
        $scope.loadJs = function(file) {
            var scriptTag = document.getElementById('loadScript');
            var body = document.getElementsByTagName('body').item(0);
            if (scriptTag)
                body.removeChild(scriptTag);
            var script = document.createElement('script');
            script.src = file;
            script.type = 'text/javascript';
            script.id = 'loadScript';
            body.appendChild(script);
        };

        $scope.loadCss = function(file) {
            var cssTag = document.getElementById('loadCss');
            var head = document.getElementsByTagName('head').item(0);
            if (cssTag)
                head.removeChild(cssTag);
            var css = document.createElement('link');
            css.href = file;
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.id = 'loadCss';
            head.appendChild(css);
        };

        function getDefaultTheme() {
            $http.get('http://127.0.0.1:3000/api/theme/1').then(function(response) {
                var cssFile = response.data;
                $scope.loadCss(cssFile.css);
            });
        }

        function getThemes() {
            $http.get('http://127.0.0.1:3000/api/themes').then(function(response) {
                $scope.themes = response.data;
            });
        }

        getDefaultTheme();
        getThemes();
    }]);