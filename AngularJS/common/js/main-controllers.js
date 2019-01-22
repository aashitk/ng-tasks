'use strict';

function userFormDataInput() {
  this.txtAttributeName = '';
  this.txtAttributeValue = '';
}

var mainCtrls = angular.module('mainControllers', ['ngRoute', 'ngAnimate', 'ngSanitize']);

mainCtrls.controller('MainCtrl', ['$scope', '$state', '$window', function($scope, $state, $window) {
  $scope.userFormData = [];
  $scope.strJson = {};

  $scope.userFormData.push(new userFormDataInput());

  $scope.addFields = function() {
    $scope.userFormData.push(new userFormDataInput());
  };

  $scope.isEntryAvailable = function(index) {
    return !!$scope.userFormData[index].txtAttributeName.trim() 
        && !!$scope.userFormData[index].txtAttributeValue.trim();
  }

  $scope.getNextAvailableIndex = function(index) {
    var strLog = '';
    while(++index < $scope.userFormData.length && !$scope.isEntryAvailable(index)) {
      strLog += strLog ? ', ' + index : index;
    }
    if(strLog) {
      console.log('Entry ' + strLog + ' is/are empty.');
    }
    return index;
  }

  $scope.createAttr = function(idx) {
    if(!idx) {
      idx = 0;
    }
    var objAttr = {};
    objAttr.name = $scope.userFormData[idx].txtAttributeName.toString().trim();
    objAttr.attribute = true;
    objAttr.variation = [];
    objAttr.variation = $scope.createAttrVal(idx);
    return objAttr;
  };

  $scope.createAttrVal = function(idx) {
    var arrObjAttrVal = [];
    var attrValues = $scope.userFormData[idx].txtAttributeValue.toString().split(',');
    var nextIndex = $scope.getNextAvailableIndex(idx);
    var i = 0;
    for (var attrVal of attrValues) {
      var attrName = attrVal.trim();
      if(!attrName) {
        continue;
      }
      arrObjAttrVal[i] = {};
      arrObjAttrVal[i].name = attrName;
      arrObjAttrVal[i].attribute = false;
      if(nextIndex < $scope.userFormData.length) {
        arrObjAttrVal[i].variation = [];
        arrObjAttrVal[i].variation.push($scope.createAttr(nextIndex));
      } else {
        arrObjAttrVal[i].stock = arrObjAttrVal[i].cost = arrObjAttrVal[i].totalcost = '0';
      }
      i++;
    }
    return arrObjAttrVal;
  }

  $scope.validate = function() {
    if($scope.isEntryAvailable(0)) {
      $scope.strJson = $scope.createAttr();
      console.log(JSON.stringify($scope.strJson));
      $state.go('UserMatrixData');
    }
    else {
      var msg = 'Enter atleast 1 entry.'
      $window.alert(msg);
    }
  };

  $scope.getStock = function(objVariate) {
    var stock = 0;
    if(objVariate.variation && objVariate.variation.length > 0) {
      for(var variate of objVariate.variation) {
        stock += $scope.getStock(variate);
      }
      if(!objVariate.attribute) {
        objVariate.stock = stock.toString();
      }
    }
    else if (objVariate.stock) {
      stock = parseInt(objVariate.stock) || 0;
      objVariate.stock = stock.toString();
      objVariate.cost = (parseInt(objVariate.cost) || 0).toString();
      objVariate.totalcost = (stock * (parseInt(objVariate.cost) || 0)).toString();
    }
    else {
      objVariate.stock = objVariate.totalcost = '0';
      objVariate.cost = (parseInt(objVariate.cost) || 0).toString();
    }
    return stock;
  }

  $scope.updateStocks = function() {
    var totalStock = $scope.getStock($scope.strJson);
    $scope.strJson.stock = (parseInt(totalStock)).toString();
  };
  
  $scope.generateUserDataJson = function() {
    $scope.updateStocks();
    console.log('Result JSON:-');
    console.log($scope.strJson);
    $window.alert('Entry JSON generated successfully. Check console for result.');
  }
}]);