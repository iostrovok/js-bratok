(function() {
    var app = angular.module('script-log', []);

    app.controller('ScriptLogCtrl', [
        "$scope", "$http", "$location", "$filter",
        function($scope, $http, $location, $filter) {

            console.log("ScriptLogCtrl!");

            getList();

            function getMyList() {
            }
        }
    ]);
})();
