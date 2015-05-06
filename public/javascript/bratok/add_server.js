(function() {
    var app = angular.module('add-server', ['top-menu']);


    app.controller('ServersAddCtrl', ["$scope",
        function($scope) {
            this.topTab = '';
            this.nextTab = '';
            this.editScriptID = '';
            $scope.addScriptCtrl = this;

            this.iTest = function(newValue) {
                console.log("EditScript! Test! - " + newValue);
            };
        },


    ]);
})();
