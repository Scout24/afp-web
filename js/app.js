angular.module('afpClientApp', ['ngRoute'])
  .constant("appVars", {
    afpApiEndpoint: "/afp-api/latest/"
  })
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
      when('/console/:account/:role', {
        templateUrl: 'templates/console.html',
        controller: 'ConsoleController'
      }).
      otherwise({
        templateUrl: 'templates/resultlist.html',
        controller: 'AccountlistController'
      });
    }]);