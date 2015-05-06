(function() {
    var app = angular.module('script-log', ['top-menu', 'http-post']);

    app.controller('ScriptLogCtrl', [
        "$scope", "$http", "$location", "$filter", '$routeParams', "setMyLoc", "sendPost",
        function($scope, $http, $location, $filter, $routeParams, setMyLoc, sendPost) {

            $scope.scriptID = $routeParams.scriptID;

            $scope.logList = [];
            $scope.myScript = {
                env: [],
                params: [],
                times: []
            };


            console.log("ScriptLogCtrl!");
            getScriptLog($scope.scriptID);

            function getScriptLog(scriptID) {
                setMyLoc.set('scripts', 'scripts');
                $http.get('/api/script/log/' + scriptID + '?' + (new Date()).getTime()).success(function(data) {
                    $scope.myScripts = [];
                    if (data.error === "") {
                        $scope.logList = data.data.list;
                    }
                    $scope.errorMes = data.error;
                });
            }

        }
    ]);
})();
