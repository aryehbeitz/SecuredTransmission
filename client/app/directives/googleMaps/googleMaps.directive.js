export default /*@ngInject*/ function googleMapsDirective($timeout, googleMapsService) {
    return {
        restrict: 'A',
        scope: {
            googleMaps: '&'
        },
        link: link
    };

    function link($scope, $element, attributes) {
        $scope.$watch($scope.googleMaps, (newValue) => {
            if (newValue) {
              if (!googleMapsService.isMap()) {
                googleMapsService.createMap($element[0]);
              }
            }
        });
    }
}
