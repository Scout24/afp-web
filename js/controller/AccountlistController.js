angular.module('afpClientApp').controller('AccountlistController', ['$scope', '$http', 'userMessageService', '$timeout', 'favouritesService', 'appVars', '$location', '$window',
  function ($scope, $http, userMessageService, $timeout, favouritesService, appVars, $location, $window) {

    $scope.showWaiting = true;
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
        $scope.showWaiting = false;

        return;
      }

      $scope.favoriteCount = favouritesService.readFavorites(accounts);
      $scope.accounts = accounts;
      $scope.showError = false;
      $scope.showWaiting = false;
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

    $scope.goToAWSConsole = function (role) {
      var callbackurl = encodeURIComponent($location.absUrl());
      var url = appVars.afpApiEndpoint + "account/" + role.URLSuffix + "/consoleurl?callbackurl=" + callbackurl;

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
    };

  }]);