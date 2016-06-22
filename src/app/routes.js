(function(){
  'use-strict';

  angular.module('rusd').config(function($stateProvider, $urlRouterProvider){
    console.log("loaded");
      $urlRouterProvider.otherwise("/home");
      $stateProvider.state('home',{
        url:"/home",
        templateUrl:'/app/home/home.html',
      });

  });

})();
