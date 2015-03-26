'use strict';

angular.module('myApp.selectBox', [])

    .directive('selectBox', [function() {
        function dropDownListHandler(e){
            var $scope = e.data.scope;
            if(e.keyCode == 32 || e.keyCode == 40 || e.keyCode == 13){
                $scope.$apply($scope.showList())
            }
            return false;
        }
        function keyDownHandler(e){
            e.stopPropagation();
            var $scope = e.data.scope;
            var element = e.data.element;
            var items = $scope.items;
            var focusIndex = 0;
            if(e.keyCode == 13){
                angular.forEach(items,function(item,i){
                    if(item.focus !== ''){
                        $scope.$apply(
                            $scope.selectItem(item)
                        )
                    }
                });
            }
            if(e.keyCode == 27){
                $scope.$apply(
                    $scope.hideList()
                )
            }
            if (e.keyCode == 40 || e.keyCode == 38){
                angular.forEach(items,function(item,i){
                    if(item.focus){
                        item.focus = '';
                        if(e.keyCode == 40){
                            focusIndex = i+1;
                        }else if(e.keyCode == 38){
                            focusIndex = i-1;
                        }
                    }
                });
                if(focusIndex>items.length-1){
                    focusIndex = 0;
                }
                if(focusIndex<0){
                    focusIndex = 0;
                }
                $scope.$apply(
                    $scope.items[focusIndex].focus = 'select-box-list-item-focus'
                )
            }
            return false;
        }
        return {

            link:function($scope, $element, attrs) {
                $scope.items = [
                    {
                        name:'',
                        right:false,
                        checked:false,
                        focus:''
                    },
                    {
                        name:'Paris',
                        right:false,
                        checked:false,
                        focus:''
                    },
                    {
                        name:'Moscow',
                        right:false,
                        checked:false,
                        focus:''
                    },
                    {
                        name:'San Francisco',
                        right:true,
                        checked:false,
                        focus:''
                    }
                ];
                $scope.items[0].focus = 'select-box-list-item-focus';
                $scope.items[0].checked = true;
                $scope.selectBoxListItemClassName ='';
                $scope.listVisibility = false;
                $scope.selectBoxControlValue = '';
                $scope.selectBoxControlClassName = '';
                angular.element($element).find(".select-box-control").on("focus",function(){
                    console.log("element focus");
                    angular.element($element).one("keydown",'',{scope:$scope,element:$element},dropDownListHandler)
                });
                angular.element($element).find(".select-box-control").on("blur",function(){
                    console.log("element blur");
                    angular.element($element).off("keydown",'',{scope:$scope,element:$element},dropDownListHandler)
                });

            },
            priority: 0,
            terminal:false,
            templateUrl: '/app/view1/select-box.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope, $element) {
                $scope.showList = function(){
                    $scope.listVisibility = true;
                    console.log("element show list");
                    angular.element($element).off("keydown",dropDownListHandler);
                    angular.element($element).on('keydown','',{scope:$scope,element:$element}, keyDownHandler);
                };
                $scope.hideList = function(){
                    $scope.listVisibility = false;
                    console.log("element hide list");
                    angular.element($element).on('keydown','',{scope:$scope,element:$element},dropDownListHandler);
                    angular.element($element).off('keydown',keyDownHandler);
                };
                $scope.toggleList = function (){
                    if($scope.listVisibility){
                       $scope.hideList();
                    }else{
                       $scope.showList();
                    }
                };

                $scope.selectItem = function (item) {
                    angular.forEach($scope.items, function (item) {
                        item.checked = false;
                        item.focus = '';
                    });
                    item.focus = 'select-box-list-item-focus';
                    item.checked = !item.checked;
                    $scope.selectBoxControlValue = item.name;
                    if(item.name == ''){
                        $scope.selectBoxControlClassName = ''
                    }else{
                        if (item.right) {
                            $scope.selectBoxControlClassName = 'select-box-control-right'
                        } else {
                            $scope.selectBoxControlClassName = 'select-box-control-wrong'
                        }
                    }
                    $scope.hideList();
                };

            }
        }
    }]);