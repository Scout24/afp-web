angular.module('afpClientApp').controller('credentials-controller', [
  '$scope', '$http', '$routeParams', 'userMessageService', 'appVars',
  function ($scope, $http, $routeParams, userMessageService, appVars) {
    $scope.showWaiting = true;
    userMessageService.getAccountList(function (err, loginstatus, accounts) {
      $scope.loginstatus = loginstatus;

      if (err) {
        $scope.error = err.message;
        $scope.showError = true;

        return;
      }

      $scope.accounts = accounts;
      $scope.showError = false;
    });

    var url = appVars.afpApiEndpoint + "account/" + $routeParams.account + "/" + $routeParams.role + "/credentials";
    $http.get(url)
      .success(function (response, status, headers) {
        $scope.credentials = response;
        $scope.showCredentials = true;
        $scope.showError = false;
        $scope.showWaiting = false;
        $scope.loginstatus = userMessageService.getLoginstatus(headers);
      })
      .error(function (response, status, headers) {
        $scope.error = userMessageService.getErrorMessage(status, response);
        $scope.showCredentials = false;
        $scope.showError = true;
        $scope.showWaiting = false;
        $scope.loginstatus = userMessageService.getLoginstatus(headers);
      });
  }]);