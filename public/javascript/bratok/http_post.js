(function() {

    var app = angular.module('http-post', []);

    app.controller("httpPost", ["$scope", "$location",
        function($scope, $location) {}
    ]);

    app.factory('sendPost', ['$http', function($http) {
        var h = $http;
        var hash = {
            post: function(url, date) {
                return _sendPost(h, url, date);
            }
        };
        return hash;
    }]);

    function _sendPost($http, url, date) {
        // Use x-www-form-urlencoded Content-Type
        //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        return $http({
            method: 'POST',
            url: url,
            data: date,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }


})();
