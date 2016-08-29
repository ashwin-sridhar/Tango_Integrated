'use strict';
/**
 * @ngdoc function
 * @name tango.controller:ConfCtrl
 * @description
 * # ConfCtrl
 * Conference Controller of the Tango app - For all operations related to conference module
 */
angular.module('tango')
  .factory('conference', ['$http','$window', function($http,$window){
    var conference={
      confs:[],
      possiblechairs:[]
    };

    //fetches all conferences
  conference.gatherConfData = function(){
     return $http.get('/gatherConfData').success(function(data){
      angular.copy(data,conference.confs);
     });
  };

  //brings one conference document based on passed ID
  conference.getSingleConfdata=function(conid){
    console.log(conid);
    return $http.get('/getconfdata/'+conid).success(function(data){
      console.log(data);
      angular.copy(data,conference.confs);

    });

  };

  //PUT call to update the provided details of a selected conference(confid)
  conference.updateconfdata = function(confdata,origconf){
    console.log(conference);

     return $http.put('/updateconfdata/'+origconf._id,confdata);

  };

  conference.fetchUsersForChairman=function(){
    return $http.get('/getAllUsers').success(function(data){
      angular.copy(data,conference.possiblechairs)
    })

  };



    return conference;
      
    }

  ]);


angular.module('tango').controller('ConfCtrl', ['$scope','$state','conference', function($scope,$state,conference){
  
  $scope.conference=conference.confs;
  $scope.possiblechairs=conference.possiblechairs;
    $scope.confdata={};
  

  
  //calls the updateconfdata factory method and transitions view to dashboard on success
 $scope.updateConfdata=function(){
          conference.updateconfdata($scope.confdata,$scope.conference).error(function(error){
      $scope.error=error;
    }).then(function(){
       
      $state.go('home.dashboard');
    })

  };

  //Invoked when user selects to make changes to a particular conference, passed id to retrieve specific details
  $scope.getSingleConfdata=function(conid){
    console.log(conid);
    conference.getSingleConfdata(conid).error(function(error){
      $scope.error=error;
    }).then(function(){
      conference.fetchUsersForChairman().error(function(error){
        $scope.error=error;
      }).then(function(){
      $state.go('home.confdetails');
      })
    })

  };

 
}
]);