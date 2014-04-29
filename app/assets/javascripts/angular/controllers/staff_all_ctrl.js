var app = angular.module('Arsenal');

app.controller('StaffAllCtrl', [
  '$scope', 'StaffAll', function($scope, StaffAll) {
    $scope.staffs = StaffAll.query();
    console.log($scope.staffs);

    $scope.map = {
    	center: {
    		latitude: 35.657153,
    		longitude: 139.696332
    	},
    	zoom: 15
    }
  }
]);
