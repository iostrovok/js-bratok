/* Common services */
(function() {
    "use strict";

    var module = angular.module('BratokServices', [])
        .factory('BratokHttp', ['$http', function SpHttp($http) {
            return {
                'get': $http.get,
                'delete': $http.delete,
                head: $http.head,
                jsonp: $http.jsonp,
                'post': $http.post,
                put: $http.put,
                pendingRequests: $http.pendingRequests
            };
        }]);
}());
