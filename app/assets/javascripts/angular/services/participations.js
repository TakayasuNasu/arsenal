var app = angular.module('Arsenal');
app.factory('Participation', function($resource) {
  return $resource('/arsenal/api/participation_all/:id', {id: '@id'});
});
