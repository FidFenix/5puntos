(function () {

  angular
    .module('PostApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'postData'];
  function homeCtrl ($scope, postData) {
    var vm = this;
    vm.pageHeader = {
      title: 'Posts'
    };
    vm.sidebar = {
      content: "AQUI posteamos."
    };
    vm.message = "cargando los posts";

    vm.getData = function (postid) {
      vm.message = "Buscando Posts";
      loc8rData.locationByCoords(lat, lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No hay posts";
          vm.data = { post: data };
          console.log(vm.data);
        })
        .error(function (e) {
          vm.message = "Algo salio mal";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };
  }
})();
