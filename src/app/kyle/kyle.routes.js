(function(){
  'use-strict';

  angular.module('rusd.kappa').config(function($stateProvider, $urlRouterProvider){

      $stateProvider.state('kappastate',{
        url:"/kappa",
        controller:"kappaController as kappa",
        templateUrl:'/app/kyle/kyle.html'
      });

  });

})();
