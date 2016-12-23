(function() {

  angular
    .module('postApp')
    .service('postData', postData);

  postData.$inject = ['$http'];
  function postData ($http) {
    var posts = function () {
      return $http.get('/api/locations');
    };
    return {
      posts:posts
    };
  }

})();
