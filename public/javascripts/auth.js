'use strict';
/**
 * @ngdoc function
 * @name tango.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Auth Controller of the Tango app - handles authentication
 */
angular.module('tango')
  .factory('auth', ['$http','$window', function($http,$window){
  	var auth={};
    

  	auth.saveToken=function(token){
  		$window.localStorage['tango-token']=token;
  	}

  	auth.getToken=function(token){
  		return $window.localStorage['tango-token'];
  	}

  	auth.isLoggedIn = function(){
  		var token = auth.getToken();

  		if(token){
    		var payload = JSON.parse($window.atob(token.split('.')[1]));

    		return payload.exp > Date.now() / 1000;
  		}
  		else {
    		return false;
  		}
	};
	auth.currentUser = function(){
  		if(auth.isLoggedIn()){
   			var token = auth.getToken();
  			var payload = JSON.parse($window.atob(token.split('.')[1]));

   			return payload.username;
 		 }
	};
  //To provide ObjectID of the logged in user
  auth.currentUserID = function(){
    if(auth.isLoggedIn()){
      return auth.currentUserObjID;
    }

  };
  
  auth.currentUserIid = function(){
  		if(auth.isLoggedIn()){
   			var token = auth.getToken();
  			var payload = JSON.parse($window.atob(token.split('.')[1]));
   			return payload._id; // abstract_id
			
 		 }
	};
  
	auth.register = function(user){
 		 return $http.post('/register', user).success(function(data){
  		  auth.saveToken(data.token);
        auth.currentUserObjID=data.uid;
 		 });

	};
	auth.logIn = function(user){
 		 return $http.post('/login', user).success(function(data){
   		 auth.saveToken(data.token);
       auth.currentUserObjID=data.uid;
       console.log(auth.currentUserObjID);
       
 		 });
	};
	auth.logOut = function(){
  		$window.localStorage.removeItem('tango-token');
      
	};
  	return auth;
  		
  	}

  ]);


angular.module('tango').controller('AuthCtrl', ['$scope','$state','auth', function($scope,$state,auth){
	$scope.user={};
	$scope.register=function(){
		auth.register($scope.user).error(function(error){
		$scope.error="Username already exists";
	}).then(function(){
		$state.go('home');
	});
	};
	$scope.login=function(){
		auth.logIn($scope.user).error(function(error){
			$scope.error="Enter Correct Details";
		}).then(function(data){
      //$cookies.put("UID","iihgiehgui");
      $state.go('home');
		})
	};
  $scope.logout=function(){
    auth.logOut();
    $state.go('login');
  }
}

]);