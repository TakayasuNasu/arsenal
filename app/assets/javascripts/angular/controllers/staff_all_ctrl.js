var app = angular.module('Arsenal');

app.controller('StaffAllCtrl', [
  '$scope',
  '$modal',
  '$log',
  '$http',
  '$window',
  'StaffAll',
  'StaffInfo',
  'LoanCompany',
  'Group',
  'Department',
  'Prefecture',
  function( $scope,
            $modal,
            $log,
            $http,
            $window,
            StaffAll,
            StaffInfo,
            LoanCompany,
            Group,
            Department,
            Prefecture ) {

    // ログインしたユーザーのidを取得
    StaffInfo.query().$promise.then(function(current_staff) {
        $scope.currnt_staff_id = current_staff.id;
    });

    var loan_company_data = {};
    var markerData = [];

    $scope.staffs = StaffAll.query();
    console.log($scope.staffs);

    $scope.myMarkers = [];
    var marker = {};

    // 社員一覧情報から現場の住所を取得してgooglemapにアイコンを表示
    $scope.staffs.$promise.then(function(staff_list) {
        angular.forEach(staff_list, function(staff, key){
            if (staff.loan_company) {
                // 現場情報が登録されている場合
                var geocoder = new google.maps.Geocoder();

                geocoder.geocode(
                    {address: staff.loan_company.address},
                    function(results, status){
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0].geometry) {
                                // geometryから住所の緯度・軽度を取得
                                var latlng = results[0].geometry.location;
                                marker.latitude = latlng.lat();
                                marker.longitude = latlng.lng();
                                marker.title = staff.full_name;
                                marker.nick_name = staff.nick_name;
                                marker.email = staff.email;
                                marker.group_id = staff.group_id;
                                marker.mugshot_url = staff.mugshot_url;
                                marker.loan_company = staff.loan_company.name;
                                marker.options = {title: staff.full_name}
                                $scope.myMarkers.push(marker);
                                marker = {};
                            }
                        }
                });
            };
        });
    });

    $scope.map = {
    	center: {
    		latitude: 35.657153,
    		longitude: 139.696332
    	},
    	zoom: 13
    }

    $scope.open = function(id) {
        find(id);
        if ($scope.currnt_staff_id == id) {
            // 出向先、班、所属、出身地を取得
            $scope.loan_companies = LoanCompany.query();
            $scope.groups = Group.query();
            $scope.departments = Department.query();
            $scope.prefectures = Prefecture.query();

            $modal.open({templateUrl:"update.html", scope: $scope});
        } else {
            $modal.open({templateUrl:"show.html", scope: $scope});
        }
    }

    // 社員情報を更新
    $scope.update = function(){
        $http.post('/arsenal/staffs/update',
            {
             'id': $scope.currnt_staff_id,
             'department_id': $scope.registered_staff.department_id,
             'group_id': $scope.registered_staff.group_id,
             'prefecture_id': $scope.registered_staff.prefecture_id,
             'loan_company_id': $scope.registered_staff.loan_company_id,
             'tweets': $scope.registered_staff.tweets
            }).success(function(data, status, headers, config) {
                $window.location.href = '/arsenal/home'
            }).error(function(data, status) {
                console.log('error:' + status);
        });
    }

    // idに紐づくユーザー情報を取得・設定
    find = function(id){
        $scope.registered_staff = {};
        $scope.staffs.$promise.then(function(staff_list) {
            angular.forEach(staff_list, function(staff, key){
                if (staff.id == id) {
                    $scope.registered_staff.name = staff.full_name;
                    $scope.registered_staff.mugshot_url = staff.mugshot_url;
                    $scope.registered_staff.tweets = staff.tweets;
                    if (staff.department_id != null) {
                        $scope.registered_staff.department_id = staff.department_id;
                        $scope.registered_staff.department_name = staff.department.name;
                    }
                    if (staff.group_id != null) {
                        $scope.registered_staff.group_id = staff.group_id;
                        $scope.registered_staff.group_name = staff.group.name;
                    }
                    if (staff.prefecture_id != null) {
                        $scope.registered_staff.prefecture_id = staff.prefecture_id;
                        $scope.registered_staff.prefecture_name = staff.prefecture.name;
                    }
                    if (staff.loan_company_id != null) {
                        $scope.registered_staff.loan_company_id = staff.loan_company_id;
                        $scope.registered_staff.loan_company_name = staff.loan_company.name;
                    }
                }
            });
        });
    }
  }
]);
