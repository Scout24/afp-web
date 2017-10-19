angular.module('afpClientApp').factory('userMessageService', [
  '$http', 'appVars',
  function ($http, appVars) {

    function getErrorMessage(status, response) {
      var error_message;

      // If the api server had a problem we don't have a json response
      if ([401].indexOf(status) >= 0) {
        error_message = "Authorization Problem";
      } else if ([500].indexOf(status) >= 0) {
        error_message = "Problem with the API server";
        // Everything is fine and we got a json response from api server
      } else if (response) {
        error_message = response.message;
      } else {
        error_message = "Could not connect to server."
      }

      return error_message;
    }

    function getLoginstatus(headers) {
      if (headers('X-Username')) {
        return {
          message: "Logged in as " + headers('X-Username'),
          loggedin: true
        };
      } else {
        return {
          message: "Not logged in",
          loggedin: false
        };
      }
    }

    function createAccountArray(response) {
      var result = [];

      angular.forEach(response, function (details, accountName) {
        var account = "";
        if ("id" in details) {
          account = {
            'AccountName': accountName,
            'Roles': [],
            'AccountID': details['id']
          };

          angular.forEach(details['roles'], function (role) {
            account.Roles.push({
              'Name': role,
              'URLSuffix': accountName + '/' + role
            });
          });
        }
        else {
          account = {
            'AccountName': accountName,
            'Roles': []
          };
          angular.forEach(details, function (role) {
            account.Roles.push({
              'Name': role,
              'URLSuffix': accountName + '/' + role
            });
          });
        }
        result.push(account)
      });

      return result;
    }

    function getAccountList(callback) {
      var error = {};

      $http.get(appVars.afpApiEndpoint + "account?withid")
        .success(function (response, status, headers) {
          callback(null, getLoginstatus(headers), createAccountArray(response));
        })
        .error(function (response, status, headers) {
          error.message = getErrorMessage(status, response);
          callback(error, getLoginstatus(headers));
        });
    }

    return {
      getLoginstatus: getLoginstatus,
      getErrorMessage: getErrorMessage,
      getAccountList: getAccountList
    };

  }]);