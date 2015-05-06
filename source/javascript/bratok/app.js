(function() {

    "use strict";

    var app = angular.module('bratok', [
        'scripts-list', 'script-log', 'add-script', 'servers-list', 'add-server',
        'top-menu',
        'ngRoute', 'ngAnimate'
    ]);


    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/', {
                templateUrl: 'include/index.html',
                controller: 'ViewController'
            }).


            when('/servers/list', {
                templateUrl: 'include/servers/servers_list.html',
                controller: 'ServersListCtrl'
            }).
            when('/servers/add/', {
                templateUrl: 'include/servers/add_server.html',
                controller: 'ServersAddCtrl'
            }).
            when('/servers/edit/:serverID', {
                templateUrl: 'include/servers/add_server.html',
                controller: 'ServersAddCtrl'
            }).

            when('/scripts/list', {
                templateUrl: 'include/scripts/scripts_list.html',
                controller: 'ScriptsListCtrl'
            }).
            when('/scripts/add/', {
                templateUrl: 'include/scripts/add_script.html',
                controller: 'ScriptsAddCtrl'
            }).
            when('/scripts/edit/:scriptID', {
                templateUrl: 'include/scripts/add_script.html',
                controller: 'ScriptsAddCtrl'
            }).
            when('/scripts/log/:scriptID', {
                templateUrl: 'include/scripts/script_log.html',
                controller: 'ScriptLogCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);

    app.controller("ViewController", ["$scope",
        function($scope) {
            $scope.ViewController = this;
        }
    ]);

})();
