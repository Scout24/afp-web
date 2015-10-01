angular.module('afpClientApp').controller('accountlist-controller', ['$scope', '$http', 'userMessageService',
  function ($scope, $http, userMessageService) {

    $scope.showWaiting = true;
    $scope.showCredentials = false;

    userMessageService.getAccountList(function (err, loginstatus, accounts) {

      $scope.loginstatus = loginstatus;

      if (err) {
        $scope.error = err.message;
        $scope.showError = true;
        $scope.showWaiting = false;

        return;
      }

      $scope.accounts = accounts;
      $scope.showError = false;
      $scope.showWaiting = false;
    });
  }]);