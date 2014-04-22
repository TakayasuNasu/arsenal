var app = angular.module('Arsenal');

app.controller('StaffsCtrl', [
  '$scope', 'Staff', function($scope, Staff) {
    $scope.staffs = Staff.query();

    $scope.checkAll = function(){
    	if (document.staffInfo.allChacke.checked) {
  			document.staffInfo.regist.disabled = false;
  		}else{
  			document.staffInfo.regist.disabled = true;
  		}
    }
  }
]);
