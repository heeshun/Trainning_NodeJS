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

  $scope.login = {
    email: '',
    password: ''

  };

  $scope.user = {
    name: '',
    email: '',
    password: '',
    age: '',
    gender: ''
  };

  var userLoginID = $('#user-id').text().trim();
  if (userLoginID) {
    $http.get('/api/user/' + userLoginID).then(function (res) {
      if (res.err) {
        alert('Create Unsuccessfully');
        return;
      }
      $scope.user = res.data.user;
    });
  }

  $scope.clickViewDetail = function (index) {
    $scope.filmDetail = $scope.listFilm[index];
    console.log($scope.listFilm);
    console.log($scope.filmDetail.userCreate);
  };

  $scope.clickRegister = function () {
    var user = {
      name: $scope.userName,
      email: $scope.userEmail,
      password: $scope.userPassword,
      age: $scope.userAge,
      gender: $scope.userGender
    };

    $http.post('api/user/create', user).then(function (res) {
      if (res.err) {
        alert('Create Unsuccessfully');
        return;
      }
      $scope.user = res.data.user;
    });
    $('#registerModal').modal('hide');
  };

  $scope.clickSearchType = function (type) {
    $scope.searchFilm = type;
    $scope.categories = type;
  };

  $scope.clickLogin = function () {
    if ($scope.userEmail.length === 0) {
      document.getElementById('emailRegister').setCustomValidity('Email là bắt buộc');
      return;
    }
    var login = {
      email: $scope.userEmail,
      password: $scope.userPassword
    };
    $http.post('/api/auth/login', login).then(function (res) {
      if (res.err) {
        alert('Đăng nhập thành công');
      }
      $scope.user.name = res.data.user.name;
      $('#loginModal').modal('hide');
    });
  };

  $scope.clickLogout = function (res) {
    $http.get('./api/auth/logout').then(function (res) {
      console.log(res.message);
      if (res.message) {
        $scope.user = [];
      } else {
        return true;
      }
    });

  };

  $http.get('/api/cinema').then(function (res) {
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
