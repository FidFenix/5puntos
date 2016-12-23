angular.module('loc8rApp', []);

var postListCtrl = function ($scope, loc8rData, geolocation) {
  $scope.message = "Viendo los posts";

  $scope.getData = function (position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    $scope.message = "Buscando postss";
    loc8rData.locationByCoords(lat, lng)
      .success(function(data) {
        $scope.message = data.length > 0 ? "" : "No hay posts";
        $scope.data = { locations: data };
      })
      .error(function (e) {
        $scope.message = "Hay erroresr";
      });
  };

  $scope.showError = function (error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  };
};

var postData = function ($http) {
  var post = function () {
    return $http.get('/api/posts');
  };
  return {
    locationByCoords : locationByCoords
  };
};

angular
  .module('postApp')
  .controller('postListCtrl', locationListCtrl)
  .service('postData', loc8rData);

