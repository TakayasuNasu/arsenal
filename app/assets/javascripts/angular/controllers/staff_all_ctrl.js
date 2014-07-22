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
  'PrivateGroup',
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
            Prefecture,
            PrivateGroup ) {

    // ログインしたユーザーのidを取得
    StaffInfo.query().$promise.then(function(current_staff) {
        $scope.currnt_staff_id = current_staff.id;
    });

    $scope.staffs = StaffAll.query();
    console.log($scope.staffs);

    $scope.loan_companies = LoanCompany.query();

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
                                marker.department = staff.department.name;
                                marker.group = staff.group.name;
                                marker.prefecture = staff.prefecture.name;
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

    var modalInstance;
    // ログインユーザーの場合は更新用、それ以外は詳細情報用のモーダルを表示
    $scope.open = function(id) {
        $scope.privateGroups = PrivateGroup.query({id: id});
        find(id); // 取得と設定をしてるので返り値を取らない
        if ($scope.currnt_staff_id == id) {
            // 出向先、班、所属、出身地を取得
            $scope.groups = Group.query();
            $scope.departments = Department.query();
            $scope.prefectures = Prefecture.query();

            modalInstance = $modal.open({templateUrl:"update.html", scope: $scope});
        } else {
            modalInstance = $modal.open({templateUrl:"show.html", scope: $scope});
        }
    }

    // 出向先新規登録
    $scope.openLoanCompanyRegist = function(){
        modalInstance.close();
        $scope.loanCompanyData = {};
        $modal.open({templateUrl:"loanCompanyRegist.html", scope: $scope});
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

    // 既に登録済みか確認
    $scope.isRegisteredName = function(data) {
        var registFlag = false;
        angular.forEach($scope.loan_companies, function(loan_company, key){
            if (angular.equals(data, loan_company.name)) {
                registFlag =  true;
            }
        });
        return registFlag;
    }

    $scope.isRegisteredAddress = function(data) {
        var registFlag = false;
        angular.forEach($scope.loan_companies, function(loan_company, key){
            if (angular.equals(data, loan_company.address)) {
                registFlag =  true;
            }
        });
        return registFlag;
    }

    // 出向先を登録
    $scope.create = function(){
        $http.post('/arsenal/loan_companies/create', {
            'name': $scope.loanCompanyData.name,
            'address': $scope.loanCompanyData.address,
        })
        .success(function(data, status, headers, config)  {
            $window.location.href = '/arsenal/home'
        })
        .error(function(data, status){
            console.log('error:' + status);
        });

    }

    // yammerグループを登録
    $scope.addPrivateGroup = function(){
        $http.post('/arsenal/staffs/add_private_group', {
            'id': $scope.currnt_staff_id
        })
        .success(function(data, status, headers, config)  {
            $window.location.href = '/arsenal/home'
        })
        .error(function(data, status){
            console.log('error:' + status);
        });
    }

    $scope.findBy = function(name){
        $log.log(name);
        $scope.query = name;
    }

    // idに紐づくユーザー情報を取得・設定
    find = function(id){
        $scope.registered_staff = {};
        $scope.staffs.$promise.then(function(staff_list) {
            angular.forEach(staff_list, function(staff, key){

                // ユーザーが自分の詳細画面を開く場合、各種情報を設定
                if (staff.id == id) {
                    $scope.registered_staff.name = staff.full_name;
                    $scope.registered_staff.mugshot_url = staff.mugshot_url;
                    $scope.registered_staff.tweets = staff.tweets;

                    // 所属が未登録の場合もあるので、登録している場合のみ設定
                    if (staff.department_id != null) {
                        $scope.registered_staff.department_id = staff.department_id;
                        $scope.registered_staff.department_name = staff.department.name;
                    }

                    // グロープが登録済みの場合のみ設定
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
