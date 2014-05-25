var app = angular.module('Arsenal');
app.factory('Event', function($resource) {
  return $resource('/arsenal/api/event_all/:id', {id: '@id'});
});
