(function() {
    var app = angular.module('top-menu', []);

    var confTab = {
        topTab: "",
        nextTab: ""
    };

    app.factory('setMyLoc', [function setMyLoc() {
        return {
            set: function(topTab, nextTab) {
                confTab.topTab = topTab;
                confTab.nextTab = nextTab;
            }
        };
    }]);

    app.controller("topMenu", ["$scope", "$location",
        function($scope, $location) {
            this.topTab = confTab.topTab;
            this.nextTab = confTab.nextTab;

            console.log("$location: " + $location);

            this.setLoc = function(newValue) {
                console.log("befor setLoc: " + newValue);
                console.log("befor $location.path(): " + $location.path);
                console.log("befor $location.url(): " + $location.url());
                console.log("befor $location.absUrl(): " + $location.absUrl());

                $location.path(newValue);

                console.log("after $location.path(): " + $location.path());
                console.log("after $location.url(): " + $location.url());
                console.log("after $location.absUrl(): " + $location.absUrl());
            };

            this.setNextTab = function(nextTab) {
                console.log("setNextTab: " + nextTab);
                this.nextTab = nextTab;
            };

            this.isNextTab = function(tabName) {
                return confTab.nextTab === tabName;
            };

            this.setTopTab = function(topTab) {
                console.log("setTopTab: " + topTab);
                confTab.topTab = topTab;
                this.topTab = topTab;
            };

            this.isTopTab = function(tabName) {
                return confTab.topTab === tabName;
            };

            this.isSsecondLevel = function() {
                return confTab.topTab === "servers" || confTab.topTab === "scripts";
            };

        }
    ]);
    /*
        app.factory('setLoc', ['$scope', function setLoc($scope) {
            var t = this;
            return function(topTab, nextTab) {
                t.topTab = "";
                t.nextTab = "";
            };
        }]);
    */
})();
