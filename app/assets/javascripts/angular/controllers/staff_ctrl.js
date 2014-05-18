var app = angular.module('Arsenal');

app.controller('StaffsCtrl', [
  '$scope', '$modal','Staff', function($scope, $modal, Staff) {

    var modalInstance = $modal.open({
      templateUrl:"progress.html",
      backdrop:"static",
      keyboard:false
    });

    $scope.staffs = Staff.query(
      {},
      function(){
        modalInstance.close();
      },
      function(){
        modalInstance.close();
        $scope.data = {result: "通信エラー"}
      }
    );

    $scope.checkAll = function(){
    	if (document.staffInfo.allChacke.checked) {
  			document.staffInfo.regist.disabled = false;
  		}else{
  			document.staffInfo.regist.disabled = true;
  		}
    }
  }
]);
