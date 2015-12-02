angular.module('afpClientApp').controller('AccountlistController', ['$scope', '$http', 'userMessageService', '$timeout', 'favouritesService', 'appVars',
  function ($scope, $http, userMessageService, $timeout, favouritesService, appVars) {

    $scope.showCredentials = false;
    $scope.favoriteCount = 0;
    $scope.filterQuery = '';
    $scope.showCredentialsType = 'bash';

    function focusQueryInput() {
      $timeout(function () {
        document.getElementById('filterQuery').focus();
      });
    }

    $scope.resetQuery = function () {
      $scope.filterQuery = '';
      focusQueryInput();
    };

    $scope.addFavorite = function (account) {
      account.favorite = !account.favorite;
      favouritesService.write(account);
      $scope.favoriteCount = favouritesService.readFavorites($scope.accounts);
    };

    userMessageService.getAccountList(function (err, loginstatus, accounts) {
      $scope.loginstatus = loginstatus;

      if (err) {
        $scope.error = err.message;
        $scope.showError = true;

        return;
      }

      $scope.favoriteCount = favouritesService.readFavorites(accounts);
      $scope.accounts = accounts;
      $scope.showError = false;
      focusQueryInput();
    });


    $scope.getCredentials = function (role) {
      var url = appVars.afpApiEndpoint + "account/" + role.URLSuffix + "/credentials";

      $scope.showCredentials = false;
      $scope.showWaiting = true;

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
    };

  }]);