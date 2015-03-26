'use strict';

// Declare app level module which depends on myApp.selectBox
angular.module('myApp', [
  'ngRoute',
  'myApp.selectBox',
  'myApp.view1'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
