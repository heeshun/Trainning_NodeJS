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
  for (var i = 1970; i <= 2018; i++) $scope.listYear.push(i);

  $scope.filmName = '';
  $scope.filmType = $scope.listTypeFilms[0];
  // $scope.filmYear = 1970;
  $scope.filmAuthor = '';
  $scope.filmContent = '';
  $scope.filmCreater = '';
  var userLoginID = $('#user-id').text().trim();

  $scope.clickUploadFilm = function () {
    if (!$scope.filmName || !$scope.filmType || !$scope.filmYear || !$scope.filmAuthor || !$scope.filmContent) {
      return;
    }
    console.log($scope.filmYear);
    var film = {
      name: $scope.filmName,
      typeFilm: $scope.filmType,
      createDate: $scope.filmYear,
      author: $scope.filmAuthor,
      content: $scope.filmContent,
      userCreate: userLoginID
    };
    $http.post('api/cinema/create', film).then(function (film) {
      $scope.error = false;
      $scope.film = film;
      alert('Tải lên thành công');
    });

  };
}]);
