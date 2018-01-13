var app = angular.module('appCinema', []).controller('createCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.listTypeFilms = [
    'Hành động',
    'Tình cảm',
    'Khoa học viễn tưởng',
    'Hài',
    'Hoạt hình',
    'Võ thuật',
    'Kinh dị'
  ];

  $scope.listYear = [];
  for (var i = 1900; i <= 2018; i++) $scope.listYear.push(i);

  $scope.filmName = '';
  $scope.filmType = $scope.listTypeFilms[0];
  $scope.filmYear = new Date().getFullYear;
  $scope.filmAuthor = '';
  $scope.filmContent = '';

  $scope.clickUploadFilm = function () {
    var film = {
      name: $scope.filmName,
      typeFilm: $scope.filmType,
      createDate: $scope.filmYear,
      author: $scope.filmAuthor,
      content: $scope.filmContent
    };
    $http.post('api/cinema/create', film).then(function (film) {
      $scope.error = false;
      $scope.film = film;
      alert('Upload Successfully');
    });

  };
}]);
