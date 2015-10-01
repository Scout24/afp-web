angular.module('afpClientApp', ['ngRoute'])
  .constant("appVars", {
    afpApiEndpoint: "/afp-api/latest/"
  })
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/credentials/:account/:role', {
          templateUrl: 'templates/resultlist.html',
          controller: 'credentials-controller'
        }).
        when('/console/:account/:role', {
          templateUrl: 'templates/resultlist.html',
          controller: 'console-controller'
        }).
        otherwise({
          templateUrl: 'templates/resultlist.html',
          controller: 'accountlist-controller'
        });
    }]);
