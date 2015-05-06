(function() {
    var app = angular.module('scripts-list', ['top-menu']);

    app.controller('ScriptsListCtrl', [
        "$scope", "$http", "$location", "$filter", "setMyLoc",
        function($scope, $http, $location, $filter, setMyLoc) {

            console.log("ScriptsListCtrl!");

            $scope.myScripts = [];
            getList();

            function getList() {
                setMyLoc.set('scripts', 'scripts');
                $http.get('/api/script_list?' + (new Date()).getTime()).success(function(data) {
                    $scope.myScripts = [];
                    if (data.error === "") {
                        $scope.myScripts = data.data.list;
                    }
                    $scope.errorMes = data.error;
                });
            }

            $scope.viewEditScript = function(scriptID) {
                $location.path("/scripts/edit/" + scriptID);
            };

            $scope.viewLogScript = function(scriptID) {
                $location.path("/scripts/log/" + scriptID);
            };

            

            $scope.startRunScript = function(scriptID) {
                if (confirm("Run script: "+ scriptID +" now?") ) {
                    $http.get('/api/start/'  + scriptID+"?t="+(new Date()).getTime()).success(function(data) {
                        var mess = "";
                        if (data.error === "" && data.result === 1) {
                            mess = "Result of starting of "+ scriptID +"."+
                                "\nstatus: \""+data.data.status+"\""+
                                "\ntime: "+ $filter('date')(data.data.time, "yyyy-MM-dd hh:mm:ss");
                        } else {
                           mess = "Error! Result of starting of "+ scriptID +": "+ data.error;
                        }
                        alert(mess);
                    });
                }
            };

        }
    ]);
})();
