(function() {
    var app = angular.module('servers-list', ['top-menu']);

    app.controller('ServersListCtrl', [
        "$scope", "$http", "$location", "setMyLoc",
        function($scope, $http, $location, setMyLoc) {

            console.log("ServersListCtrl!");

            $scope.myServers = [];
            getList();

            function getList() {
                setMyLoc.set('servers', 'servers');
                $http.get('/api/server_list').success(function(data) {
                    $scope.myServers = [];
                    if (data.error === "") {
                        $scope.myServers = data.data.list;
                    }
                    $scope.errorMes = data.error;
                });
            }

            function viewEditServer(scriptID) {
                console.log("viewEditScript. scriptID: " + scriptID);
                // setMyLoc.set('servers', 'servers');
                // $http.get('/api/server_list').success(function(data) {
                //     $scope.myServers = [];
                //     if (data.error === "") {
                //         $scope.myServers = data.data.list;
                //     }
                //     $scope.errorMes = data.error;
                // });
            }
        }
    ]);
})();
