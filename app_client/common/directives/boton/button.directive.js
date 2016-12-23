(function () {

  angular
    .module('postApp')
    .directive('button', button);

  function ratingStars () {
    return {
      restrict: 'EA',
      scope: {
        thisBoton : '=rating'
      },
      templateUrl: '/common/directives/boton/button.template.html'
    };
  }


})();
