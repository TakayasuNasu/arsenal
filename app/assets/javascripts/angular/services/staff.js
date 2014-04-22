var app = angular.module('Arsenal');
app.factory('Staff', function($resource) {
  return $resource('/arsenal/api/staffs/:id', {id: '@id'});
});
