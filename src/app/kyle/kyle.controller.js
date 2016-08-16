(function(){
  'use-strict';

  angular.module('rusd.kappa').controller('kappaController',function(){
      console.log("what2");
      var vm = this;
		vm.getDate = function(){
			var d = new Date();
			return d ;
		};
		vm.foo="foojhkljhlkjh";
		vm.counter=0;
		vm.incr = function(value){
			
//			if(vm.counter>=100){
//				vm.counter="Kreygasm";
//							
//			}else if(typeof vm.counter=="number"){
//				
//			}
			if (typeof value=="number")
			vm.counter = vm.counter + value;
			
		};
  });
})();
