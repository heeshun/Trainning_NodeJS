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

  $scope.user = {
    name: '',
    email: '',
    password: '',
    age: '',
    gender: ''
  };

  if (userLoginID) {
    $http.get('/api/user/' + userLoginID).then(function (res) {
      if (res.err) {
        alert('Server lỗi');
        return;
      }
      $scope.user.name = res.data.user.name;
      console.log($scope.user.name);
    });
  }

  $scope.clickLogout = function () {
    if (confirm('Bạn muốn đăng xuất không?')) {
      $http.get('./api/auth/logout').then(function (res) {
        $scope.loading = true;
        if (res.data.message) {
          $scope.user = {};
          $scope.loading = false;
          window.location.replace('/');
        } else {
          alert('Vui lòng thử lại');
        }
      });
    }
  };

  $scope.clickUploadFilm = function () {
    console.log(userLoginID);
    if (!$scope) {
      window.location.replace('/');
    }
    if (!$scope.filmName || !$scope.filmType || !$scope.filmYear || !$scope.filmAuthor || !$scope.filmContent) {
      return;
    }
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
      location.reload();
    });

  };
}]);
