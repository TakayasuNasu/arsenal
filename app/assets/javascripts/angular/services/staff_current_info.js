var app = angular.module('Arsenal');
app.factory('StaffInfo', function($resource) {
  return $resource('/arsenal/api/current_info/:id',
			  		{id: '@id'},
			  		{'query': { method: 'GET', isArray: false}}
  				   );
});
