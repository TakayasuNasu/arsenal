
var app = angular.module('Arsenal');
app.factory('LoanCompany', function($resource) {
  return $resource('/arsenal/api/loan_company/:id', {id: '@id'});
});

var app = angular.module('Arsenal');
app.factory('Group', function($resource) {
  return $resource('/arsenal/api/group/:id', {id: '@id'});
});

var app = angular.module('Arsenal');
app.factory('Department', function($resource) {
  return $resource('/arsenal/api/department/:id', {id: '@id'});
});

var app = angular.module('Arsenal');
app.factory('Prefecture', function($resource) {
  return $resource('/arsenal/api/prefecture/:id', {id: '@id'});
});

var app = angular.module('Arsenal');
app.factory('PrivateGroup', function($resource) {
  return $resource('/arsenal/api/private_group/:id', {id: '@id'});
});
