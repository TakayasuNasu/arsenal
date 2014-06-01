var app = angular.module('Arsenal');

app.controller('SidebarCtrl', [
  '$scope',
  '$log',
  'StaffInfo',
  function( $scope,
            $log,
            StaffInfo) {

  		$scope.currnt_staff = {};

		// ログインしたユーザーのidを取得
	    StaffInfo.query().$promise.then(function(current_staff) {
	        $scope.currnt_staff.full_name = current_staff.full_name;
	        $scope.currnt_staff.mugshot_url = current_staff.mugshot_url;
	    });

	}
]);
