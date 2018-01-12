var app = angular.module('appCinema', []).controller('listCtrl', ['$scope', '$http', function ($scope, $http) {

  var listFilm = [];

  $http.get('/api/cinemas', listFilm).then(function (res) {
    console.log(res);
    $scope.listFilm = res.data;
  });
}]);
