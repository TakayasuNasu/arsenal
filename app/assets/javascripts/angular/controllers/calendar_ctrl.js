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
	function (	$scope,
				$modal,
				$log,
				$http,
				$window,
				datepickerConfig,
				datepickerPopupConfig,
				timepickerConfig,
				Event) {

		datepickerConfig.showWeeks = false;
		datepickerConfig.dayTitleFormat = "yyyy年 MMMM";
		datepickerPopupConfig.currentText = "本日";
		datepickerPopupConfig.clearText = "消去";
		datepickerPopupConfig.toggleWeeksText = "週番号";
		datepickerPopupConfig.closeText = "閉じる";
		timepickerConfig.showMeridian = false;

		$scope.open = function(registeredEvent) {
			$scope.event = registeredEvent;
			$log.log($scope.event);
			$modal.open({templateUrl:"eventRegist.html", scope: $scope});
		}

		var eventList = [];
		var eventObjct = {};
		Event.query().$promise.then(function(events) {
			angular.forEach(events, function(event, key) {
				eventObjct.id = event.id;
				eventObjct.title = event.name;
				eventObjct.description = event.description;
				eventObjct.start = new Date(event.date);
				eventList.push(eventObjct);
				eventObjct = {};
			});
		});

		$scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
	        $scope.open(event);
	    };

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
			eventClick: $scope.alertOnEventClick
		};

		$scope.update = function() {
			$http.post('/arsenal/events/update',
				{'id': $scope.event.id,
				 'name': $scope.event.title,
				 'description': $scope.event.description,
				 'date': $scope.event.start}
				).success(function(data, status, headers, config) {
					$window.location.href = '/arsenal/home'
				}).error(function(data, status) {
					console.log('error:' + status);
				});
		}

	}
]);