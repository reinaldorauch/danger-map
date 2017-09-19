(function (angular, undefined) {
  ///////////////////////////////
  // dangerMap app root module //
  ///////////////////////////////
  const dangerMap = angular.module('dangerMap', [
    'ui.bootstrap',
    'uiGmapgoogle-maps'
  ]);

  ///////////////////
  // MapController //
  ///////////////////
  dangerMap.controller('MapController', MapController);

  MapController.$inject= ['$document', '$uibModal'];

  function MapController($document, $uibModal) {
    var vm = this;

    vm.map = {
      center: {
        latitude: -25.09376358925737,
        longitude: -50.10270047187805
      },
      zoom: 16,
      events: {
        click: onMapClickOpenRAModal
      }
    };

    function onMapClickOpenRAModal(pointSelected) {
      openModal()
        .then(persistInformation.bind(null, pointSelected))
        .catch(handleError);
    }

    function persistInformation(pointSelected, raFormInfo) {
      console.log(pointSelected, raFormInfo);
    }

    function handleError(err) {
      console.error(err.stack || err.message || err);
    }

    function openModal() {
      var modalInstance = $uibModal.open({
        animation: false,
        ariaLabelledBy: 'Formulário para entrada do RA',
        ariaDescribedBy: 'Entre seu ra no campo para confirmar que você é um aluno da UEPG',
        templateUrl: 'ra-input.html',
        controller: 'RaInputController',
        controllerAs: 'vm',
        appendTo: angular.element($document[0].querySelector('.parent-modal')) || undefined
      });

      return modalInstance.result;
    }
  }

  ///////////////////////
  // RaInputController //
  ///////////////////////
  dangerMap.controller('RaInputController', RaInputController);

  RaInputController.$inject = ['$scope'];

  function RaInputController($scope) {
    var vm = this;

    vm.ra = null;

    vm.submitRa = submitRa;

    function submitRa() {
      $scope.$close(vm.ra);
    }
  }
})(angular);