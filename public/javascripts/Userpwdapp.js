'use strict';
/**
 * @ngdoc function
 * @name aromeo.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Agileromeo app
 */
 var app = angular.module('tango',[]);
 // angular.module('tango',[])
 app.factory('Userspwd', function($http){
   return {
   
     updateUserpassword : function(id,userdata){
     return $http.put('/updateuserpwd/' +id,userdata);
  },
  
  }
  
  });
  
  


  app.controller('UserspwdCtrl', ['$scope','$state','Userspwd','auth',function($scope,$state,Userspwd,auth){
  
  $scope.formData = {};
  $scope.userdata = {};

      		
				
  $scope.updateUserpassword = function(id) {
      Userspwd.updateUserpassword(auth.currentUserIid(),$scope.userdata).error(function(error) {
                      $scope.error = error;
                 }).then(function(){
					  $state.go('login');
				});
        };
		
  

}]);