angular.module('afpClientApp').controller('ConsoleController', [
  '$scope', '$http', '$routeParams', '$window', '$location', 'userMessageService', 'appVars',
  function ($scope, $http, $routeParams, $window, $location, userMessageService, appVars) {
    var callbackurl = encodeURIComponent($location.absUrl());
    var url = appVars.afpApiEndpoint + "account/" + $routeParams.account + "/" + $routeParams.role + "/consoleurl?callbackurl=" + callbackurl;

    $scope.showWaiting = true;

    $http.get(url)
      .success(function (response) {
        $window.location.href = response;
      })
      .error(function (response, status, headers) {
        $scope.error = userMessageService.getErrorMessage(status, response);
        $scope.showCredentials = false;
        $scope.showError = true;
        $scope.showWaiting = false;
        $scope.loginstatus = userMessageService.getLoginstatus(headers);
      });
  }]);