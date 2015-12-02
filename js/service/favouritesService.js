angular.module('afpClientApp').factory('favouritesService', [
  function () {

    if (!localStorage.afpuserFavorites) {
      localStorage.afpuserFavorites = "{}";
    }

    return {
      write: function (account) {
        var afpuserFavorites = angular.fromJson(localStorage.afpuserFavorites);

        afpuserFavorites[account.AccountName] = account.favorite;

        localStorage.afpuserFavorites = angular.toJson(afpuserFavorites);
      },
      readFavorites: function (accounts) {
        var favoriteCount = 0;
        var afpuserFavorites = angular.fromJson(localStorage.afpuserFavorites);

        angular.forEach(accounts, function (account) {
          var afpuserFavorite = afpuserFavorites[account.AccountName];

          if (afpuserFavorite) {
            account.favorite = afpuserFavorite;
            favoriteCount++;
          } else {
            account.favorite = false;
          }
        });

        return favoriteCount;
      }
    };

  }]);