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
  $scope.filmEdit = {};

  $scope.listYear = [];
  for (var i = 1900; i <= 2018; i++) $scope.listYear.push(i);

  $scope.listOld = [];
  for (var y = 1950; y <= 2015; y++) $scope.listOld.push(y);

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
    $scope.filmEdit = angular.copy($scope.filmDetail);
  };

  $scope.clickUpdateFilm = function (filmEdit) {
    if (!$scope.filmEdit.name || !$scope.filmEdit.typeFilm || !$scope.filmEdit.createDate || !$scope.filmEdit.author || !$scope.filmEdit.content) {
      return;
    }
    $scope.filmDetail = $scope.filmEdit;
    var film = {
      _id: $scope.filmEdit._id,
      name: $scope.filmEdit.name,
      typeFilm: $scope.filmEdit.typeFilm,
      createDate: $scope.filmEdit.createDate,
      author: $scope.filmEdit.author,
      content: $scope.filmEdit.content
    };
    $http.put('/api/cinema/update', film).then(function () {
      $scope.error = false;
      $scope.film = film;
      alert('Chỉnh sửa thành công');
    });
  };

  $scope.clickRegister = function () {
    if (!$scope.userName || !$scope.userEmail || !$scope.userPassword || !$scope.userAge || !$scope.userGender) {
      return;
    }
    var user = {
      name: $scope.userName,
      email: $scope.userEmail,
      password: $scope.userPassword,
      age: $scope.userAge,
      gender: $scope.userGender
    };
    $http.post('api/user/create', user).then(function (res) {
      if (res.data.err) {
        alert('Xin vui lòng thử lại');
        return;
      } else if (res.data.err1) {
        alert('Email này đã được đăng kí');
        return;
      }
      $scope.user = res.data.user;
      alert('Đăng kí thành công');
      $('#registerModal').modal('hide');
    });
  };

  $scope.clickSearchType = function (type) {
    $scope.typeSearchFilm = type;
    $scope.categories = type;
  };

  $scope.clickLogin = function () {
    if (!$scope.userEmail) {
      return;
    }
    if (!$scope.userPassword) {
      return;
    }
    var login = {
      email: $scope.userEmail,
      password: $scope.userPassword
    };
    $http.post('/api/auth/login', login).then(function (res) {
      if (res.data.err) {
        alert('Vui lòng thử lại');
        return;
      } else if (res.data.err1) {
        alert('Email này không tồn tại');
      } else if (res.data.err2) {
        alert('Server lỗi, vui lòng thử lại sau');
      } else if (res.data.message1) {
        alert('Mật khẩu không đúng');
      } else {
        alert('Đăng nhập thành công');
      }
      $scope.user.name = res.data.user.name;
      $scope.user._id = res.data.user._id;
      $('#loginModal').modal('hide');
    });
  };

  $scope.clickLogout = function () {
    confirm('Bạn muốn đăng xuất không?');
    $http.get('./api/auth/logout').then(function (res) {
      if (res.data.message) {
        $scope.user = {};
      } else {
        alert('Vui lòng thử lại');
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
      if (changeAlias(x.name).includes(changeAlias($scope.searchFilm)) || changeAlias(x.author).includes(changeAlias($scope.searchFilm)) || changeAlias(x.content).includes(changeAlias($scope.searchFilm)) || changeAlias(x.typeFilm).includes(changeAlias($scope.searchFilm))) {
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

  $scope.$watch('typeSearchFilm', function (val) {
    $scope.listFilm = [];
    var list = $scope.listFilmStable.filter(x => {
      if (changeAlias(x.typeFilm).includes(changeAlias($scope.typeSearchFilm))) {
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

function changeAlias(alias) {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  return str;
}
