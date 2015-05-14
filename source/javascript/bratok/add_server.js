(function() {
    var app = angular.module('add-server', ['top-menu']);


    app.controller('ServersAddCtrl', [
        "$scope", "$http", "$location", '$routeParams', "$modal", "$log", "setMyLoc", "sendPost",
        function($scope, $http, $location, $routeParams, $modal, $log, setMyLoc, sendPost) {
            $scope.serverID = $routeParams.serverID;
            this.topTab = '';
            this.nextTab = '';
            $scope.myServer = {
                "id": "",
                "ip": "",
                "host": "",
                "port": 0,
                "is_master": false,
                "scripts": [],
                "scriptsSelected": {},
            };

            $scope.errorMes = '';
            $scope.animationsEnabled = true;
            $scope.scriptsList = [];
            $scope.selectedScrpt = {};

            getServer($scope.serverID);

            function getServer(serverID) {
                setMyLoc.set('servers', 'servers');
                $http.get('/api/server/info/' + serverID + '?' + (new Date()).getTime()).success(function(data) {
                    if (data.error === "") {
                        var id = "";
                        var myServer = data.data.data;
                        myServer['scriptsSelected'] = {};
                        for (var i=0; i < myServer.scripts.length; i++) {
                            myServer.scriptsSelected[myServer.scripts[i]] = true;
                        }
                        $scope.myServer = myServer;
                    }
                    $scope.errorMes = data.error;
                });
            }

            $scope.openAddScript = function () {
                setMyLoc.set('servers', 'servers');
                $http.get('/api/script_list' + '?' + (new Date()).getTime())
                    .success(function(data) {
        console.log("1 openAddScript");
                    $scope.scriptsList = [];
                    if (data.error === "") {
                        $scope.scriptsList = data.data.list;
                        for (var i=0; i < $scope.scriptsList.length; i++) {
                            $scope.scriptsList[i].selected = false;
                            var id = $scope.scriptsList[i].id;
                            if ($scope.myServer.scriptsSelected[id]) {
                                $scope.scriptsList[i].selected = true;
                            }
                        }
                        openAddScriptDialog();
                    }
        console.log("3 openAddScript");
                    $scope.errorMes = data.error;
                });
            };

            function openAddScriptDialog() {
        console.log("1 openAddScriptDialog");

                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'lg',
                    resolve: {
                        scriptsList: function () {
                            console.log("2 openAddScriptDialog. resolve. $scope.scriptsList: "+$scope.scriptsList);
                            return $scope.scriptsList;
                        }
                    }
                });
        console.log("2 openAddScriptDialog");

                modalInstance.result.then(function (selectedItem) {
                        //$scope.selected = selectedItem;
        console.log("3 openAddScriptDialog");

                        $log.info('0 Modal dismissed at: ' + new Date());
                    }, function () {
        console.log("4 openAddScriptDialog");
                        $log.info('1 Modal dismissed at: ' + new Date());
                    });
            }

        },

    ]);


    // app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

    //     $scope.animationsEnabled = true;

    //     $scope.open = function (size) {

    //     var modalInstance = $modal.open({
    //         animation: $scope.animationsEnabled,
    //         templateUrl: 'myModalContent.html',
    //         controller: 'ModalInstanceCtrl',
    //         size: size,
    //         resolve: {
    //             scriptsList: function () {
    //                 return $scope.scriptsList;
    //             }
    //         }
    //     });

    //     modalInstance.result.then(function (selectedItem) {
    //             $scope.selected = selectedItem;
    //         }, function () {
    //             $log.info('Modal dismissed at: ' + new Date());
    //         });
    //     };

    //     $scope.toggleAnimation = function () {
    //         $scope.animationsEnabled = !$scope.animationsEnabled;
    //     };

    // });

    app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, scriptsList) {

        console.log("=== 1 ModalInstanceCtrl: "+ scriptsList);

        $scope.scriptsList = scriptsList;
        $scope.selectedScrpt = {};

        $scope.ok = function () {
        console.log("=== 2 ModalInstanceCtrl");
            $modalInstance.close($scope.selectedScrpt.id);
        };

        $scope.cancel = function () {
        console.log("=== 3 ModalInstanceCtrl");
            $modalInstance.dismiss('cancel');
        };
    });

})();
