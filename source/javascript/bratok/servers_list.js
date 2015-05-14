(function() {
    var app = angular.module('servers-list', ['top-menu']);

    app.controller('ServersListCtrl', [
        "$scope", "$http", "$location", "setMyLoc",
        function($scope, $http, $location, setMyLoc) {

            console.log("ServersListCtrl!");

            $scope.myServers = [];
            getList();

            function getList() {

                console.log("getList!!!!!");

                setMyLoc.set('servers', 'servers');
                $http.get('/api/server_list').success(function(data) {
                    $scope.myServers = [];
                    console.log("getList.data = "+ data);

                    if (data.error === "") {
                        $scope.myServers = data.data.list;
                    }
                    $scope.errorMes = data.error;
                });
            }

            $scope.viewEditServer = function(serverID) {
                setMyLoc.set('servers', 'servers');
                $location.path("/servers/edit/" + serverID);
            };
        }
    ]);
})();
