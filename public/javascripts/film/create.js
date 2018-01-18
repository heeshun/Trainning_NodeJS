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
  var imageUrl = '';
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
        }
      });
      return false;
    } else {
      alert('Vui lòng chọn hình ảnh');
    }
  });

  $scope.clickUploadFilm = function () {
    if (!$scope) {
      window.location.replace('/');
    }
    if (!$scope.filmName || !$scope.filmType || !$scope.filmYear || !$scope.filmAuthor || !$scope.filmContent || !imageUrl) {
      return;
    }

    var film = {
      name: $scope.filmName,
      typeFilm: $scope.filmType,
      createDate: $scope.filmYear,
      author: $scope.filmAuthor,
      content: $scope.filmContent,
      filmImage: imageUrl,
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
