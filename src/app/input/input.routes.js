(function(){
  'use-strict';

  angular.module('rusd.input').config(function($stateProvider, $urlRouterProvider){

      $stateProvider.state('input',{
        url:"/input",
        controller:"inputController as input",
        templateUrl:'/app/input/input.html'
      });

  });

})();
