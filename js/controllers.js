function loginstatus(headers) {
  if (headers('X-Username')) {
    return "Logged in as " + headers('X-Username');
  } else {
    return "Not logged in";
  }
}

function getErrorMessage(status, response) {
    // If the api server had a problem we don't have a json response
    if ([401].indexOf(status) >= 0) {
        error_message = "Authorization Problem";
    } else if ([500].indexOf(status) >= 0) {
        error_message = "Problem with the API server";
    // Everything is fine and we got a json response from api server
    } else {
        error_message = response.message;
    }
    return error_message;
}

var afpClientControllers = angular.module('afpClientControllers', []);

var getAccountList = function($http, $scope) {
  $http.get(AFP_API_ENDPOINT + "account")
    .success(function (response, status, headers) {
      accountArrayFunction = function() {
        var result = [];
        angular.forEach(response, function(roles, accountName) {
          var account = {'AccountName': accountName, 'Roles':[]}
          angular.forEach(roles, function(role) {
            account.Roles.push({'Name':role, 'URLSuffix': accountName + '/' + role});
          });
          result.push(account)
        });
        return result;
      };
      $scope.loginstatus = loginstatus(headers);
      $scope.accounts = accountArrayFunction();
      $scope.showError = false;
    })
    .error(function (response, status, headers) {
      $scope.loginstatus = loginstatus(headers);
      $scope.error = getErrorMessage(status, response);
      $scope.showError = true;
    });
};

afpClientControllers.controller('accountlist-controller', ['$scope', '$http',
  function($scope, $http) {
    $scope.showWaiting = true;
    $scope.showCredentials = false;
    getAccountList($http, $scope);
    $scope.showWaiting = false;
}]);

afpClientControllers.controller('credentials-controller', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $scope.showWaiting = true;
    getAccountList($http, $scope);
    url = AFP_API_ENDPOINT + "account/" + $routeParams.account + "/" + $routeParams.role + "/credentials";
    $http.get(url)
      .success(function (response, status, headers) {
        $scope.credentials = response;
        $scope.showCredentials = true;
        $scope.showError = false;
        $scope.showWaiting = false;
        $scope.loginstatus = loginstatus(headers);
      })
      .error(function (response, status, headers) {
        $scope.error = getErrorMessage(status, response);
        $scope.showCredentials = false;
        $scope.showError = true;
        $scope.showWaiting = false;
        $scope.loginstatus = loginstatus(headers);
      });
}]);

afpClientControllers.controller('console-controller', ['$scope', '$http', '$routeParams', '$window', '$location',
  function($scope, $http, $routeParams, $window, $location) {
    $scope.showWaiting = true;
    callbackurl = encodeURIComponent($location.absUrl());
    url = AFP_API_ENDPOINT + "account/" + $routeParams.account + "/" + $routeParams.role + "/consoleurl?callbackurl=" + callbackurl ;
    $http.get(url)
      .success(function (response, status, headers) {$window.location.href = response;})
      .error(function (response, status, headers) {
        $scope.error = getErrorMessage(status, response);
        $scope.showCredentials = false;
        $scope.showError = true;
        $scope.showWaiting = false;
        $scope.loginstatus = loginstatus(headers);
      });
}]);
