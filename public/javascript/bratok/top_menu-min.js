!function(){var o=angular.module("top-menu",[]),t={topTab:"",nextTab:""};o.factory("setMyLoc",[function(){return{set:function(o,n){t.topTab=o,t.nextTab=n}}}]),o.controller("topMenu",["$scope","$location",function(o,n){this.topTab=t.topTab,this.nextTab=t.nextTab,console.log("$location: "+n),this.setLoc=function(o){console.log("befor setLoc: "+o),console.log("befor $location.path(): "+n.path),console.log("befor $location.url(): "+n.url()),console.log("befor $location.absUrl(): "+n.absUrl()),n.path(o),console.log("after $location.path(): "+n.path()),console.log("after $location.url(): "+n.url()),console.log("after $location.absUrl(): "+n.absUrl())},this.setNextTab=function(o){console.log("setNextTab: "+o),this.nextTab=o},this.isNextTab=function(o){return t.nextTab===o},this.setTopTab=function(o){console.log("setTopTab: "+o),t.topTab=o,this.topTab=o},this.isTopTab=function(o){return t.topTab===o},this.isSsecondLevel=function(){return"servers"===t.topTab||"scripts"===t.topTab}}])}();