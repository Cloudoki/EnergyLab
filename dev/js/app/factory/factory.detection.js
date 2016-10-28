angular
  .module('app.factory.detection', [])
  .factory('factoryDetection', factoryDetection);

function factoryDetection($rootScope, $ionicPopup) {

/*
  var currentTouches = {},
    eventName = { touchstart: 'touchstart', touchend: 'touchend' };

  // detect 3 fingers touch to enable trigger action
  var touchedOnce = false;
  if (window.navigator.msPointerEnabled) {
      eventName = { touchstart: 'MSPointerDown', touchend: 'MSPointerUp' };
  }

  document.addEventListener(eventName.touchstart, function(evt) {
    var touches = evt.touches || [evt],
        touch;

    for(var i = 0, l = touches.length; i < l; i++) {
      touch = touches[i];
      currentTouches[touch.identifier || touch.pointerId] = touch;
    }
  });

  document.addEventListener(eventName.touchend, function(evt) {
    var touchCount = Object.keys(currentTouches).length;
    currentTouches = {};

    if (touchCount === 3 && !touchedOnce) {
      evt.preventDefault();
      isDetecting(nextFakeTrigger());
      /*if(_activeTrigger.index != 0) {
        touchedOnce = true;
        setTimeout(function(){
          isNotDetecting();
          touchedOnce = false;
        }, 10000);
      }*x/
    }
  }, false);
  */

  // TODO - remove this line
  window.detectingTrigger = function() {
    //return val ? isDetecting() : isNotDetecting();
    return isDetecting(nextFakeTrigger());
  };

  var _img,
      _loadAllImg = 0,
      _patternsHolder = [],
      _indexes = {},
      _limit = 3,
      _vuforiaCordovaPlugin,
      _eventName = 'trigger:',
      _lastTrigger,
      _fakeTriggerIndex = 2,
      _detecting = false,
      _shouldDetect = true,
      _errorMessageTimeout,
      _removedPopup = false;

  function isDetecting(data) {
    _detecting = data.state;
    console.log(_eventName + data.index + ':' + _detecting);

    $rootScope.$broadcast(_eventName + data.index + ':' + _detecting);
    $rootScope.$broadcast("TRIGGER_DETECTED", data.index);
    $rootScope.$broadcast('popupStop');
  }

  /*
  function nextFakeTrigger() {
    _fakeTriggerIndex = _fakeTriggerIndex == 2 ? 0 : _fakeTriggerIndex+1;
    return {
      message: 'pattern detected',
      index: _fakeTriggerIndex
    }
  }
  */

  function isNotDetecting(data) {
    _detecting = false;
    console.log(_eventName + data.index + ':' + _detecting);
    $rootScope.$broadcast(_eventName + data.index + ':' + _detecting);
    $rootScope.$broadcast('popupStart');
  }

  /*function activeTrigger(data) {
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
        pattern = 'appelsientje.jpg';
        break;
    }

    if (!_img) return;

    _img.src = 'img/patterns/' + pattern;
    console.log("trigger (" + pattern + ") selected");
  }*/


  function waitAndSet() {
    if(window.localStorage && window.localStorage.lang) {
      _vuforiaCordovaPlugin.setLang(window.localStorage.lang, function(success){console.log(success);}, function(error){console.log(error);});
    } else {
      setTimeout(function() {
        waitAndSet()
      }, 1000);
    }
  }

  function init() {

    console.log('init factoryDetection ..');

    _errorMessageTimeout = setTimeout(function() {
      $rootScope.$broadcast('popupClose');
      _removedPopup = true;
      showErrorMessage();
    }, 30000);

    if (typeof VuforiaCordovaPlugin == 'undefined') return;

    _vuforiaCordovaPlugin = window.plugins.VuforiaCordovaPlugin || new VuforiaCordovaPlugin();

    if (typeof VuforiaCordovaPlugin == 'undefined') return;

    _vuforiaCordovaPlugin.isDetecting(function(data){
      if(_shouldDetect) {
        data = JSON.parse(data);
        isDetecting(data);
      } else {
        console.log('Should call detection:', _shouldDetect, '; data ->', data);
      }
    }, function(error){
      if(_shouldDetect) {
        error = JSON.parse(error);
        isNotDetecting(error);
      } else {
        console.log('Should call detection:', _shouldDetect, '; data ->', error);
      }
    });

    waitAndSet();

    removeErrorMessage();
  }

  function toggleDetection(state) {

    console.log("toggleDetection->", state);

    _shouldDetect = state;

  }

  function toggleScreenRotation(rotate) {
    var shouldRotate = rotate ? true : false;

    if (typeof VuforiaCordovaPlugin == 'undefined') return;

    _vuforiaCordovaPlugin.rotateScreen(shouldRotate, function(data){
      console.log('ScreenRotation ->', data);
    }, function(error){
      console.log('ScreenRotation ->', error);
    });
  }

  function detectionTimeout(t) {
    console.log("toggleTimeout->", t);
  }

  function showErrorMessage() {
    $ionicPopup.show({
       title: '<b>Something went wrong!</b>',
       subTitle: 'Please press <b>reload</b> to try and fix it. <br /><br /><small>If this message shows again after a reload, try to remove and install the app.</small>',
       buttons: [
         {
           text: 'Cancel',
           onTap: function(e) {
             $rootScope.$broadcast('popupStart'); // start popup again
           }
         },
         {
           text: '<b>Reload</b>',
           type: 'button-calm',
           onTap: function(e) {
             window.location.reload(true); // reload page
           }
         },
       ]
     });
  }

  function removeErrorMessage() {
    if(_removedPopup) {
      $rootScope.$broadcast('popupStart');
      _removedPopup = false;
    }
    clearTimeout(_errorMessageTimeout);
    console.log("Removed error message timeout.");
  }

  return {
    get eventName() {
      return _eventName;
    },
    get detecting() {
      return _detecting;
    },
    init: init,
    toggleDetection: toggleDetection,
    toggleScreenRotation: toggleScreenRotation,
    detectionTimeout: detectionTimeout
    //removeLastTrigger: isNotDetecting
  };
}

/**
 * Created by njorge on 4/4/2016.
 */
