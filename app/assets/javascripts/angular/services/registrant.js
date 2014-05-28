var app = angular.module('Arsenal');
app.factory('Registrant', function($resource) {
  return $resource('/arsenal/api/registrant/:id', {id: '@id'});
});
