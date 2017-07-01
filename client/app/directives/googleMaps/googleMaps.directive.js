export default /*@ngInject*/ function googleMapsDirective($timeout) {
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
                $timeout(() => {
                  var uluru = {lat: -25.363, lng: 131.044};
                  var map = new google.maps.Map($element[0], {
                   zoom: 4,
                   center: uluru
                  });
                  var marker = new google.maps.Marker({
                   position: uluru,
                   map: map
                  });
                });
            }
        });
    }
}
