var app = angular.module('appCinema', []).controller('listCtrl', ['$scope', '$http', function ($scope, $http) {
  var imageUrl = '';
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
  $scope.listTypeFilms2 = [
    'Tất cả',
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
  $scope.loading = true;
  $scope.listYear = [];
  for (var i = 1970; i <= 2018; i++) $scope.listYear.push(i);

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


  $('#chooseImage').on('change', function () {
    var files = $(this).get(0).files;
    // One or more files selected, process the file upload
    if (files.length > 0) {
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
      var formData = new FormData();

      // add the files to formData object for the data payload
      formData.append('sampleFile', files[0], files[0].name);
      $.ajax({
        url: '/api/cinema/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
          $('#imageUpload').attr('src', data.path);
          imageUrl = data.path;
          $scope.filmEdit.filmImage = data.path;
        }
      });
      return false;
    } else {
      alert('Vui lòng chọn hình ảnh');
    }
  });

  $scope.clickUpdateFilm = function (filmEdit) {
    if (!$scope.filmEdit.name || !$scope.filmEdit.typeFilm || !$scope.filmEdit.createDate || !$scope.filmEdit.author || !$scope.filmEdit.content) {
      return;
    }
    if (($scope.filmDetail.name == $scope.filmEdit.name) && ($scope.filmDetail.typeFilm == $scope.filmEdit.typeFilm)
    && ($scope.filmDetail.createDate == $scope.filmEdit.createDate) && ($scope.filmDetail.author == $scope.filmEdit.author)
    && ($scope.filmDetail.content == $scope.filmEdit.content) && ($scope.filmDetail.filmImage == $scope.filmEdit.filmImage)) {
      alert('Không có thông tin nào thay đổi');
      return false;
    }
    $scope.loading = true;
    var film = {
      _id: $scope.filmEdit._id,
      name: $scope.filmEdit.name,
      typeFilm: $scope.filmEdit.typeFilm,
      createDate: $scope.filmEdit.createDate,
      author: $scope.filmEdit.author,
      filmImage: $scope.filmEdit.filmImage,
      content: $scope.filmEdit.content
    };
    $scope.filmDetail.name = $scope.filmEdit.name;
    $scope.filmDetail.author = $scope.filmEdit.author;
    $scope.filmDetail.typeFilm = $scope.filmEdit.typeFilm;
    $scope.filmDetail.createDate = $scope.filmEdit.createDate;
    $scope.filmDetail.content = $scope.filmEdit.content;
    $scope.filmDetail.filmImage = $scope.filmEdit.filmImage;
    $scope.filmDetail._id = $scope.filmEdit._id;
    $http.put('/api/cinema/update', film).then(function () {
      $scope.error = false;
      $scope.film = film;
      $scope.loading = false;
      alert('Chỉnh sửa thành công');
      $('#filmEdit').modal('hide');
    });
  };

  $scope.userGender = '';
  $scope.clickRegister = function () {
    if (!$scope.userName || !$scope.userEmail || !$scope.userPassword || !$scope.userAge) {
      return;
    }
    $scope.loading = true;
    var user = {
      name: $scope.userName,
      email: $scope.userEmail,
      password: $scope.userPassword,
      age: $scope.userAge,
      gender: $scope.userGender
    };
    $http.post('api/user/create', user).then(function (res) {
      $scope.loading = false;
      if (res.data.err) {
        alert('Xin vui lòng thử lại');
        return;
      } else if (res.data.err1) {
        alert('Email này đã được đăng kí');
        return;
      }
      $('#registerModal').modal('hide');
      location.reload();
      $scope.user = res.data.user;
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
      $scope.loading = true;
      if (res.data.err) {
        alert('Vui lòng thử lại');
        return;
      } else if (res.data.err1) {
        alert('Email này không tồn tại');
      } else if (res.data.err2) {
        alert('Server lỗi, vui lòng thử lại sau');
      } else if (res.data.message1) {
        alert('Mật khẩu không đúng');
      }
      location.reload();
      $scope.loading = false;
      $scope.user.name = res.data.user.name;
      $scope.user._id = res.data.user._id;
      $('#loginModal').modal('hide');
    });
  };

  $scope.clickLogout = function () {
    if (confirm('Bạn muốn đăng xuất không?')) {
      $http.get('./api/auth/logout').then(function (res) {
        $scope.loading = true;
        if (res.data.message) {
          $scope.user = {};
          $scope.loading = false;
          location.reload();
        } else {
          alert('Vui lòng thử lại');
        }
      });
    }
  };

  $http.get('/api/cinema').then(function (res) {
    $scope.listFilm = res.data;
    $scope.loading = false;
    $scope.listFilmStable = res.data;
  });

  $scope.typeSearchFilm = '';
  $scope.searchFilm = '';
  $scope.$watchGroup(['searchFilm', 'typeSearchFilm'], searchListFilm);
  function searchListFilm(val) {
    if ($scope.typeSearchFilm == 'Tất cả') {
      $scope.typeSearchFilm = '';
    }
    $scope.listFilm = [];
    var list = $scope.listFilmStable.filter(x => {
      if ((changeAlias(x.name).includes(changeAlias($scope.searchFilm)) || changeAlias(x.author).includes(changeAlias($scope.searchFilm))
      || changeAlias(x.content).includes(changeAlias($scope.searchFilm)) || changeAlias(x.typeFilm).includes(changeAlias($scope.searchFilm))
      || changeAlias(x.createDate).includes(changeAlias($scope.searchFilm)))
      && changeAlias(x.typeFilm).includes(changeAlias($scope.typeSearchFilm))) {
        return true;
      } else {
        return false;
      }
    });
    var i;
    for (i = 0; i < list.length; i++) {
      $scope.listFilm.push(list[i]);
    }
  }

  $(function () {

    if (localStorage.chkbox && localStorage.chkbox != '') {
      $('#rememberChkBox').attr('checked', 'checked');
      $('#email').val(localStorage.email);
      $scope.userEmail = localStorage.email;
      $('#password').val(localStorage.pass);
      $scope.userPassword = localStorage.pass;
    } else {
      setTimeout(function () {
        $('#rememberChkBox').removeAttr('checked');
        $('#email').val('');
        $('#password').val('');
      }, 200);
    }

    $('#rememberChkBox').click(function () {

      if ($('#rememberChkBox').is(':checked')) {
        // save username and password
        localStorage.email = $('#email').val();
        localStorage.pass = $('#password').val();
        localStorage.chkbox = $('#rememberChkBox').val();
      } else {
        localStorage.email = '';
        localStorage.pass = '';
        localStorage.chkbox = '';
      }
    });
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
