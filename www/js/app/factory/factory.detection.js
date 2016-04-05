angular
  .module('app.factory.detection', [])
  .factory('factoryDetection', factoryDetection);

function factoryDetection($rootScope) {

  console.log('factoryDetection begin ..');

  // temp
  window.detectingTrigger = function(val) {
    return val ? isDetecting() : isNotDetecting();
  };

  var _img,
      _eventName = 'trigger:',
      _activeTrigger = {index: Config.triggers.defaultActive || 0, active: true, detected: false},
      _lastTrigger;

  function isDetecting() {
    console.log(_eventName + _activeTrigger.index + ':true');
    $rootScope.$broadcast(_eventName + _activeTrigger.index + ':true');
  }

  function isNotDetecting() {
    console.log(_eventName + _activeTrigger.index + ':false');
    $rootScope.$broadcast(_eventName + _activeTrigger.index + ':false');
  }

  /*function closeLastTrigger() {
    console.log('close:', _lastTrigger);
  }*/

  function init() {

    console.log('init factoryDetection ..');
    _img = new Image();
    _img.crossOrigin = "Anonymous";
    _img.onload = function () {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL("image/jpeg", 0.8);

      if (typeof ImageDetectionPlugin == 'undefined') return;

      ImageDetectionPlugin.setPattern(dataURL, function(success){console.log(success);}, function(error){console.log(error);});
      canvas = null;
    };

    if (typeof ImageDetectionPlugin == 'undefined') {
      //clearInterval(interval);
      //console.log("ImageDetectionPlugin is not defined!");
      console.log('current:', _activeTrigger);
      return;
    }

    ImageDetectionPlugin.isDetecting(function(success){
      isDetecting();
    }, function(error){
      isNotDetecting();
    });
  }

  return {
    set activeTrigger(data) {
      isNotDetecting();
      _lastTrigger = _activeTrigger = {
        index: data.index,
        active: true,
        detected: false
      };

      var pattern;

      switch(data.index) {
          case 0:
              pattern = 'sven.jpg';
              break;
          case 1:
              pattern = 'coke.jpg';
              break;
          case 2:
              pattern = 'Cubez.png';
            break;
      }
      _img.src = 'img/patterns/' + pattern;
    },
    get activeTrigger() {
      return _activeTrigger;
    },
    get eventName() {
      return _eventName;
    },
    init: init
  };
}

/**
 * Created by njorge on 4/4/2016.
 */
