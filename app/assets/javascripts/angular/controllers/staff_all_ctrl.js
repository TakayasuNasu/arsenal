var app = angular.module('Arsenal');

app.controller('StaffAllCtrl', [
  '$scope', 'StaffAll', function($scope, StaffAll) {
    var loan_company_data = {};
    var markerData = [];
    $scope.staffs = StaffAll.query();

    console.log($scope.staffs);

    $scope.myMarkers = [];
    var marker = {};
    $scope.staffs.$promise.then(function(staff_list) {
        angular.forEach(staff_list, function(staff, key){
            if (staff.loan_company) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode(
                    {address: staff.loan_company.address},
                    function(results, status){
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0].geometry) {
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
  }
]);
