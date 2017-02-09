angular.module('afpClientApp').controller('ConsoleController', [
  '$scope', '$http', '$routeParams', '$window', '$location', 'userMessageService', 'appVars',
  function ($scope, $http, $routeParams, $window, $location, userMessageService, appVars) {
    var timeout;
    var callbackurl = encodeURIComponent($location.absUrl());
    var url = appVars.afpApiEndpoint + "account/" + $routeParams.account + "/" + $routeParams.role + "/consoleurl?callbackurl=" + callbackurl;

    $scope.showWaiting = true;

    function getConsoleUrl() {
      clearTimeout(timeout);

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
    }

    function logoutAwsAccount(onReady) {
      var img = document.createElement("img");
      img.src = "https://signin.aws.amazon.com/oauth?Action=logout&redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com";
      img.addEventListener('error', onReady, false); // AWS will do a redirect after the logout. This is threaded as error, so we can go on with the login.
    }

    function fallbackAfterTimeout(onTimeout) {
      timeout = setTimeout(onTimeout, 4000);
    }

    logoutAwsAccount(getConsoleUrl);
    fallbackAfterTimeout(getConsoleUrl);
  }]);