!function(){var r=angular.module("servers-list",["top-menu"]);r.controller("ServersListCtrl",["$scope","$http","$location","setMyLoc",function(r,e,s,t){function o(){t.set("servers","servers"),e.get("/api/server_list").success(function(e){r.myServers=[],""===e.error&&(r.myServers=e.data.list),r.errorMes=e.error})}console.log("ServersListCtrl!"),r.myServers=[],o()}])}();