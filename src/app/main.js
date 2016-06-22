(function(){
  'use-strict';

  angular.module('rusd').controller('mainController',function(){
      console.log("what1");
      var vm = this;
      vm.hateCount = 0;
      vm.hate = function(){
        vm.hateCount ++;
        console.log("hate");
      }

  });
})();
