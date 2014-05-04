var app = angular.module('Arsenal');

app.controller('StaffAllCtrl', [
  '$scope', 'StaffAll', function($scope, StaffAll) {
    var loan_company_data = {};
    var markerData = [];
    $scope.staffs = StaffAll.query(function (response) {
      angular.forEach(response, function (item) {
        if (item.loan_company) {
            loan_company_data.full_name = item.full_name;
            loan_company_data.mugshot_url = item.mugshot_url;
            loan_company_data.loan_company_name = item.loan_company.name;
            loan_company_data.loan_company_address = item.loan_company.address;
            markerData.push(loan_company_data);
        };
      });
      console.log(markerData[0].loan_company_address);

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address: markerData[0].loan_company_address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            for (var i in results) {
                 if (results[i].geometry) {
                    var latlng = results[i].geometry.location;
                    console.log(latlng.lat());

                    $scope.myMarkers = [
                    {
                        latitude:  latlng.lat(),
                        longitude: latlng.lng(),
                        mugshot_url: markerData[0].mugshot_url
                    }
                    ];
                 }
            }
        }
    });

    });

    console.log($scope.staffs);

    $scope.map = {
    	center: {
    		latitude: 35.657153,
    		longitude: 139.696332
    	},
    	zoom: 13
    }
  }
]);
