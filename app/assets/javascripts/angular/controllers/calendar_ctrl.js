var app = angular.module('Arsenal');

app.config(
	 ["$httpProvider",
	 	function($httpProvider){
	 		$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
	 	}
	]
);

app.controller('CalendarCtrl', [
	'$scope',
	'$modal',
	'$log',
	'$http',
	'$window',
	'datepickerConfig',
	'datepickerPopupConfig',
	'timepickerConfig',
	'Event',
	'StaffInfo',
	'Participation',
	'Registrant',
	function (	$scope,
				$modal,
				$log,
				$http,
				$window,
				datepickerConfig,
				datepickerPopupConfig,
				timepickerConfig,
				Event,
				StaffInfo,
				Participation,
				Registrant){

		datepickerConfig.showWeeks = false;
		datepickerConfig.dayTitleFormat = "yyyy年 MMMM";
		datepickerPopupConfig.currentText = "本日";
		datepickerPopupConfig.clearText = "消去";
		datepickerPopupConfig.toggleWeeksText = "週番号";
		datepickerPopupConfig.closeText = "閉じる";
		timepickerConfig.showMeridian = false;

		$scope.participations_id = 1;

		StaffInfo.query().$promise.then(function(current_staff) {
			$scope.currnt_staff_id = current_staff.id;
		});

		var eventList = [];
		var eventObjct = {};
		Event.query().$promise.then(function(events) {
			angular.forEach(events, function(event, key) {
				eventObjct.id = event.id;
				eventObjct.staff_id = event.staff_id;
				eventObjct.title = event.name;
				eventObjct.location = event.location;
				eventObjct.description = event.description;
				eventObjct.start = new Date(event.date);
				eventList.push(eventObjct);
				eventObjct = {};
			});
		});

		$scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
	        $scope.open(event);
	    };

	    $scope.alertOnDayClick = function( date, allDay, jsEvent, view ) {
	    	$scope.openCreateEventWindow(date);
	    }

		$scope.eventSources = [eventList];

		$scope.uiConfig = {};
		$scope.uiConfig.calendar = {
			height: 450,
			editable: false,
			header:{
				left: 'title',
				center:'',
				right:'today prev,next'
			},
			dayNames : ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
			dayNamesShort : ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
			eventClick: $scope.alertOnEventClick,
			dayClick: $scope.alertOnDayClick,
		};

		$scope.openCreateEventWindow = function( date ) {
			$scope.newEvent = {};
			$scope.eventDay = date;
			$modal.open({templateUrl:"eventCreate.html", scope: $scope});
		}

		$scope.open = function(registeredEvent) {
			$scope.event = registeredEvent;
			$scope.participations = Participation.query();
			if ($scope.event.staff_id == $scope.currnt_staff_id) {
				$modal.open({templateUrl:"eventUpdate.html", scope: $scope});
			} else {
				$scope.registrants = Registrant.query({id: $scope.event.id});
				isCurrenStaff($scope.registrants);
				$modal.open({templateUrl:"eventRegist.html", scope: $scope});
			}
		}

		$scope.create = function() {
			$log.log($scope);
			$http.post('/arsenal/events/create',
				{'staff_id': $scope.currnt_staff_id,
				 'name': $scope.newEvent.name,
				 'description': $scope.newEvent.description,
				 'location': $scope.newEvent.location,
				 'date': $scope.eventDay}
				).success(function(data, status, headers, config) {
					$window.location.href = '/arsenal/home'
				}).error(function(data, status) {
					console.log('error:' + status);
				});
		}

		$scope.update = function() {
			$http.post('/arsenal/events/update',
				{'id': $scope.event.id,
				 'name': $scope.event.title,
				 'description': $scope.event.description,
				 'location': $scope.event.location,
				 'date': $scope.event.start}
				).success(function(data, status, headers, config) {
					$window.location.href = '/arsenal/home'
				}).error(function(data, status) {
					console.log('error:' + status);
				});
		}

		$scope.regist = function() {
			$http.post('/arsenal/event_registers/create',
				{'event_id': $scope.event.id,
				 'staff_id': $scope.currnt_staff_id,
				 'participation_id': $scope.participations_id
				}).success(function(data, status, headers, config) {
					$window.location.href = '/arsenal/home'
				}).error(function(data, status) {
					console.log('error:' + status);
				});
		}

		$scope.updateRegister = function(){
			$http.post('/arsenal/event_registers/update',
				{'event_id': $scope.event.id,
				 'staff_id': $scope.currnt_staff_id,
				 'participation_id': $scope.participations_id
				}).success(function(data, status, headers, config) {
					$window.location.href = '/arsenal/home'
				}).error(function(data, status) {
					console.log('error:' + status);
				});
		}

		$scope.change = function(id) {
			$scope.participations_id = id;
		}

		isCurrenStaff = function(registrants) {
			$scope.current_flag = false;
			registrants.$promise.then(function(registantList) {
				angular.forEach(registantList, function(register, key) {
					if ($scope.currnt_staff_id == register.staff_id) {
						$scope.current_flag = true;
						$scope.participations_id = register.participation_id;
					}
				});
			});
		}

	}
]);