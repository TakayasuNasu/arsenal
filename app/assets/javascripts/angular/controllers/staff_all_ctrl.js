var app = angular.module('Arsenal');

app.controller('StaffAllCtrl', [
  '$scope', 'StaffAll', function($scope, StaffAll) {
    $scope.staffs = StaffAll.query();
    console.log($scope.staffs);
  }
]);
