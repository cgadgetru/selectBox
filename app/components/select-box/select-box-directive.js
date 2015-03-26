'use strict';

angular.module('myApp.selectBox', [])

    .directive('selectBox', [function() {
        return function(scope, elm, attrs) {
            console.log("select box");
        };
    }]);