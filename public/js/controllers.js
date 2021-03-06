'use strict';
/**********************************************************************
 * Home controller
 **********************************************************************/
angular.module('myApp')
.controller('HomeCtrl', function($scope,$log, data,files) {
  $scope.msgs=data;
  var ds=$scope.msgs;
  $scope.$on('socket:message', function(event,msg){
		$log.info('socket:message',msg);
		ds.push(msg);
		while(ds.length>6)
		   ds.shift();
		$scope.$apply();

	});
 var slides = $scope.slides = [];
   $scope.myInterval = 5000;
   var idx=1;
  $scope.addSlide = function(fn) {
    //var newWidth = 600 + slides.length + 1;
   // var ext= (idx==4)?'.gif':'.jpg';
    var imgurl='/upload/' +fn;
    slides.push({
      image: imgurl,
      text: ''
    });
   // $log.info(imgurl);
  };
  for(var i=0;i<files.length;i++)
     $scope.addSlide(files[i]);  
})


/**********************************************************************
 * User controller
 **********************************************************************/
.controller('UserCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.register = function(){
    $http.post('/register', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Register successful!';
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Register failed.';
    });
      $location.url('/login');
  };
   // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $location.url('/admin');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      $location.url('/login');
    });
  };
})

/**********************************************************************
 * Admin controller
 **********************************************************************/
.controller('AdminCtrl', function($scope,loggedin) {

  $scope.msg = {title:'this is title',
	  text:'# 一级标题\n'+
           '## 这级标题\n'+
           'This is a normal paragraph:\n'+
           '\n'+
           '    This is a code block.\n\n'+
           '[详细参考](http://www.ituring.com.cn/article/775)'
	  };
   
});
