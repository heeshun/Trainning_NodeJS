var app = angular.module('appCinema', []).controller('listCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.listFilm = [];
  $scope.listFilmStable = [];
  $scope.listTypeFilms = [
    'Hành động',
    'Tình cảm',
    'Khoa học viễn tưởng',
    'Hài',
    'Hoạt hình',
    'Võ thuật',
    'Kinh dị'
  ];
  $scope.listGender = [
    'Nam',
    'Nữ',
    'Không xác định'
  ];
  $scope.categories = 'Thể Loại';

  $scope.clickLogin = function () {
    $http.get('api/get-user').then(function (res) {
    });
  };

  $scope.user = {

  }

  $scope.clickRegister = function () {
    var user = {
      name: $scope.userName,
      email: $scope.userEmail,
      password: $scope.userPassword,
      age: $scope.userAge,
      gender: $scope.userGender
    };
    $http.post('api/create-user', user).then(function (res) {
      console.log(res);
      if (res.err) {
        alert('Create Unsuccessfully');
        return;
      }
      $scope.user = res.data.user;
      console.log($scope.user);
    });
  };

  $scope.clickSearchType = function (type) {
    $scope.searchFilm = type;
    $scope.categories = type;
  };

  $http.get('/api/cinemas').then(function (res) {
    $scope.listFilm = res.data;
    $scope.listFilmStable = res.data;
  });

  $scope.$watch('searchFilm', function (val) {
    $scope.listFilm = [];
    var list = $scope.listFilmStable.filter(x => {
      if (x.name.includes($scope.searchFilm) || x.author.includes($scope.searchFilm) || x.typeFilm.includes($scope.searchFilm)) {
        return true;
      } else {
        return false;
      }
    });
    var i;
    for (i = 0; i < list.length; i++) {
      $scope.listFilm.push(list[i]);
    }
  });
}]);
