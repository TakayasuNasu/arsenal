var app = angular.module('Arsenal');
app.factory('StaffAll', function($resource) {
  return $resource('/arsenal/api/all/:id', {id: '@id'});
});
