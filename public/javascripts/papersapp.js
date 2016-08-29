'use strict';
/**
 * @ngdoc function
 * @name tango.controller:PaperCtrl
 * @description
 * # PaperCtrl
 * Paper Controller of the Tango app - For all operations related to papers module
 */
angular.module('tango').factory('paper', ['$http','$window', function($http,$window){

    var paper={
      paps:[],
    };
    
    paper.getAllPapers = function(){
     return $http.get('/api/papers').success(function(data){
        console.log(data);
      angular.copy(data,papers.paps);
     });
  };

  paper.getSinglePaperdata=function(papid){
    console.log(papid);
    return $http.get('/api/papers/'+papid).success(function(data){
      console.log(data);
      angular.copy(data,paper.paps);

    });

  };

  paper.assignAReviewer=function(paperid,assignData){

    return $http.put('/assignReviewer/'+paperid,assignData);

  };

    return paper;
  }

  ]);


angular.module('tango').controller('PaperCtrl', ['$scope','$state','$http','paper','Users', function($scope,$state,$http,paper,Users){
  
  $scope.assignData={};
   
  // when landing on the page, get all papers and show them
        $http.get('/api/papers')
                .success(function(data) {
                        $scope.papers = data;
                        Users.fetchAllUsers();
                        $scope.userList=Users.userList;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
  
  

  // delete a paper after checking it
        $scope.deletePaper = function(id) {
                $http.delete('/api/papers/' + id)
                        .success(function(data) {
                                $scope.papers = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
  
        //as28tuge
  $scope.assignReviewer=function(paperid){
          paper.assignAReviewer(paperid,$scope.assignData).error(function(error){
      $scope.error=error;
    }).then(function(){
       
      $state.go('home.papers');
    })

  };
 //as28tuge
  

 
}
]);