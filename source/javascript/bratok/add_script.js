(function() {
    var app = angular.module('add-script', ['top-menu', 'http-post']);


    app.controller('ScriptsAddCtrl', [
        "$scope", "$http", "$location", '$routeParams', "setMyLoc", "sendPost",
        function($scope, $http, $location, $routeParams, setMyLoc, sendPost) {
            $scope.scriptID = $routeParams.scriptID;
            this.topTab = '';
            this.nextTab = '';
            this.editScriptID = '';
            $scope.addScriptCtrl = this;
            $scope.hasChange = false;
            $scope.myScript = {
                env: [],
                params: [],
                times: []
            };

            $scope.paramsToLine = '';
            $scope.env = '';
            $scope.params = '';
            $scope.times = '';

            getScript($scope.scriptID);

            function getScript(scriptID) {
                setMyLoc.set('scripts', 'scripts');
                $http.get('/api/script/info/' + scriptID + '?' + (new Date()).getTime()).success(function(data) {
                    $scope.myScripts = [];
                    if (data.error === "") {
                        s = data.data.data;
                        if (!s.params || s.params === null) {
                            s.params = [];
                        }
                        if (!s.env || s.env === null) {
                            s.env = [];
                        }
                        if (!s.times || s.times === null) {
                            s.times = [];
                        }
                        $scope.myScript = s;
                    }
                    $scope.errorMes = data.error;
                    params_to_line_fitch();
                });
            }

            $scope.saveScriptData = function() {

                console.log("$scope.hasChange: " + $scope.hasChange);
                console.log("$scope.myScript: " + $scope.myScript);

                if (!$scope.hasChange) {
                    return;
                }

                console.log("sendPost: " + sendPost);
                for (var t in sendPost) {
                    console.log("sendPost[" + t + "]: " + sendPost[t]);
                }

                sendPost.post('/api/script/save/' + $scope.scriptID, $scope.myScript).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.errorMes = data.error;

                    console.log("status: " + status);
                    console.log("headers: " + headers);
                    console.log("config: " + config);

                    console.log("data: " + data);
                    console.log("data.length: " + data.length);

                    for (var t in data) {
                        console.log("data[" + t + "]: " + data[t]);

                    }
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("error");
                    console.log("status: " + status);
                    console.log("headers: " + headers);
                    console.log("config: " + config);

                    console.log("data: " + data);
                    console.log("data.length: " + data.length);

                    for (var t in data) {
                        console.log("data[" + t + "]: " + data[t]);

                    }
                });
            };

            $scope.deleteScriptListParam = function(key, value) {
                if (!angular.isArray($scope.myScript[key])) {
                    return;
                }
                var n = [];
                for (var t in $scope.myScript[key]) {
                    if ($scope.myScript[key][t] != value) {
                        n.push($scope.myScript[key][t]);
                    }
                }
                $scope.myScript[key] = n;
                params_to_line_fitch();
                $scope.hasChange = true;
            };

            $scope.addScriptListParam = function(key) {
                console.log("addScriptListParam. key = " + key);
                if (!angular.isArray($scope.myScript[key])) {
                    return;
                }

                var val = $scope.times + "";
                if (key === "params") {
                    val = $scope.params + "";
                } else if (key === "env") {
                    val = $scope.env + "";
                }
                if (val === "") {
                    return;
                }

                $scope.deleteScriptListParam(key, val);
                $scope.myScript[key].push(val);
                params_to_line_fitch();
                $scope.hasChange = true;
            };

            $scope.downScriptListParam = function(key, value) {
                if (!angular.isArray($scope.myScript[key])) {
                    return;
                }
                for (var i = 0; i < $scope.myScript[key].length - 1; i++) {
                    if ($scope.myScript[key][i] == value) {
                        var a = $scope.myScript[key][i + 1];
                        $scope.myScript[key][i + 1] = $scope.myScript[key][i];
                        $scope.myScript[key][i] = a;
                        params_to_line_fitch();
                        $scope.hasChange = true;
                        break;
                    }
                }
            };

            $scope.upScriptListParam = function(key, value) {
                if (!angular.isArray($scope.myScript[key])) {
                    return;
                }
                for (var t in $scope.myScript[key]) {
                    if ($scope.myScript[key][t] == value) {
                        i = t;
                        break;
                    }
                }
                for (var i = $scope.myScript[key].length - 1; i > 0; i--) {
                    if ($scope.myScript[key][i] == value) {
                        var a = $scope.myScript[key][i - 1];
                        $scope.myScript[key][i - 1] = $scope.myScript[key][i];
                        $scope.myScript[key][i] = a;
                        params_to_line_fitch();
                        $scope.hasChange = true;
                        break;
                    }
                }
            };

            function params_to_line_fitch() {
                $scope.errorMes = "";
                $scope.paramsToLine = $scope.myScript.params.join(' ');
            }
        }
    ]);
})();
