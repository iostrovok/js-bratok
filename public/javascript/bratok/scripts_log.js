(function() {
    var app = angular.module('loger-script', []);

    app.controller('ScriptsLogCtrl', [
        "$scope", "$http", "$location", "$filter",
        function($scope, $http, $location, $filter) {

            console.log("ScriptsLogCtrl!");

            getList();

            function getMyList() {
            }
        }
    ]);
})();
