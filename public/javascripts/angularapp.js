'use strict';
/**
 * @ngdoc overview
 * @name tango
 * @description
 * # tango
 *
 * Main module of the application.
 */
angular.module('tango', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngCookies'
    
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');
    //Ashwin's part starts
    $stateProvider
      .state('home', {
        url:'/home',
        templateUrl: 'pages/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'tango',
                    files:[
                    'javascripts/header/header.js',
                    'javascripts/header/header-notification/header-notification.js',
                    'javascripts/sidebar/sidebar.js',
                    'javascripts/auth.js'
                    
                                        ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngFileUpload',
                  files:["bower_components/ng-file-upload/ng-file-upload.js",
                         "bower_components/ng-file-upload/ng-file-upload.min.js",
                         "bower_components/ng-file-upload/ng-file-upload-shim.min.js"]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('home.dashboard',{
        url:'/dashboard',
        controller: 'ConfCtrl',
        templateUrl:'pages/confhome.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'tango',
              files:[
              'javascripts/main.js',
              'javascripts/notifications/notifications.js',
              'javascripts/chat/chat.js',
              'javascripts/dashboard/stats/stats.js',
              'javascripts/confhome.js',
              'javascripts/chartController.js'
              ]
            })
          },
           postPromise: ['conference', function(conference){
              return conference.gatherConfData();
           }]
        }
      })

      .state('home.confdetails',{
        url:'/confdetails',
        controller: 'ConfCtrl',
        templateUrl:'pages/confdetails.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'tango',
              files:[
                
              'javascripts/confhome.js'
              
              ]
            })
          }
        }
        
      })
  
  
 
     .state('home.papers',{
       templateUrl:'pages/manpapers.html',
       controller:'PapersCtrl',
       url:'/managePapers',
       resolve:{
        loadMyFiles:function($ocLazyLoad){
          return $ocLazyLoad.load({
            name:'papersModule',
            files:[
            'javascripts/papersapp.js',
            'javascripts/Userapp.js',
            'javascripts/auth.js',
            'javascripts/autocomplete/autocomp.js',
            'javascripts/autocomplete/autocomplete.js'

            ]

          })
        }
       }
                     
   })
//Ashwin's part ends
     

   .state('home.authors',{
     templateUrl:'pages/viewauthors.html',
     url:'/viewauthors'
 })
     .state('home.reviewers',{
       templateUrl:'pages/viewreviewers.html',
       url:'/viewreviewers'
   })
     .state('home.reviews',{
       templateUrl:'pages/tempmodal.html',
       url:'/viewreviews'
   })
  
  //Preethi's part starts
      .state('home.editprofile',{
        templateUrl:'pages/editprofile.html',
        url:'/editProfile',
        controller:'UsersCtrl',
           resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'userModule',
              files:[
              
              'javascripts/Userapp.js'
              
              ]
            })
          }
        }
    })
	.state('home.editpassword',{
        templateUrl:'pages/editpassword.html',
        url:'/editPassword',
        controller:'UserspwdCtrl',
           resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'userModule',
              files:[
               'javascripts/Userpwdapp.js'
              
              ]
            })
          }
        }
    })
	.state('register',{
        templateUrl:'pages/register.html',
        url:'/register',
        controller:'AuthCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'tango',
              files:[
              
              'javascripts/angularapp.js',
              'javascripts/auth.js'
              ]
            })
          }
        }
    })
      .state('login',{
        templateUrl:'pages/login.html',
        url:'/login',
        controller:'AuthCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'tango',
              files:[
              
              'javascripts/angularApp.js',
              'javascripts/auth.js'
              ]
            })
          }
        }
    })
//Preethi's part ends      

    //Rohit's part starts
    .state('home.createSub',{
       templateUrl:'pages/createSub.html',
       url:'/createSub',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'papersModule',
              files:[
              'javascripts/main.js',
              'javascripts/papersapp.js',
              'javascripts/autocomplete/autocomplete.js',
              'javascripts/autocomplete/autocomp.js',
              'javascripts/Userapp.js',
              'javascripts/auth.js'
              ]
            })
          }
        }
   })

      .state('home.listMySubs',{
       templateUrl:'pages/listMySubs.html',
       url:'/listMySubs',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'papersModule',
              files:[
              'javascripts/main.js',
              'javascripts/papersapp.js'
              ]
            })
          }
        }
   })

      .state('home.authorProfile',{
       templateUrl:'pages/authorProfile.html',
       url:'/authorProfile'
   })

      .state('home.viewSub',{
       templateUrl:'pages/viewSub.html',
       url:'/viewSub',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'papersModule',
              files:[
              'javascripts/main.js',
              'javascripts/papersapp.js'
              ]
            })
          }
        }
   })

       .state('home.editSub',{
       templateUrl:'pages/editSub.html',
       url:'/editSub',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'papersModule',
              files:[
              'javascripts/main.js',
              'javascripts/papersapp.js',
              'javascripts/autocomplete/autocomplete.js',
              'javascripts/autocomplete/autocomp.js',
              'javascripts/Userapp.js',
              'javascripts/auth.js'
              ]
            })
          }
        }
   })

  //Rohit'part ends
           
     
     
  }]);
