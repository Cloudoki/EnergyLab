// create the module and name it energyLab
angular
    .module('energyLab', [
        'ionic',
        'app.directives',
        'app.factory.data',
        'app.factory.utils',
        'app.components'
    ])
    .controller('AppCtrl', AppCtrl)
    .run(init);

function AppCtrl($rootScope, $scope, factoryData) {
  $scope.onSwipeLeft = function() {
    $rootScope.$broadcast($rootScope.activeTrigger === 1 ? 'sodaOpen' : $rootScope.activeTrigger === 2 ? 'infoOpen' : '');
  };
}

function init($ionicPlatform, $timeout) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
      StatusBar.hide();
      //$cordovaStatusbar.overlaysWebView(true);
    }

    /*if (cordova && cordova.platformId) {
      $('.pane').addClass('hide');
    }*/
  });
}
