var app = angular.module('Arsenal');

app.controller('StaffsCtrl', [
  '$scope', 'Staff', function($scope, Staff) {
    return $scope.staffs = Staff.query();
  }
]);
