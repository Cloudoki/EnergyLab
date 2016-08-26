angular
  .module('app.factory.detection', [])
  .factory('factoryDetection', factoryDetection);

function factoryDetection($rootScope) {

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
      }*/
    }
  }, false);

  // TODO - remove this line
  window.detectingTrigger = function() {
    //return val ? isDetecting() : isNotDetecting();
    return isDetecting(nextFakeTrigger());
  };

  var _img,
      _loadAllImg = 0,
      _patternsHolder = [],
      _limit = 3,
      _imgDetectionPlugin,
      _eventName = 'trigger:',
      _lastTrigger,
      _fakeTriggerIndex = 2,
      _detecting = false;

  function isDetecting(data) {
    _detecting = true;
    console.log(_eventName + data.index + ':' + _detecting);
    $rootScope.$broadcast(_eventName + data.index + ':' + _detecting);
    $rootScope.$broadcast("TRIGGER_DETECTED", data.index);
  }

  function nextFakeTrigger() {
    _fakeTriggerIndex = _fakeTriggerIndex == 2 ? 0 : _fakeTriggerIndex+1;
    return {
      message: 'pattern detected',
      index: _fakeTriggerIndex
    }
  }

  /*function isNotDetecting() {
    _detecting = false;
    console.log(_eventName + _activeTrigger.index + ':' + _detecting);
    $rootScope.$broadcast(_eventName + _activeTrigger.index + ':' + _detecting);
  }*/

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

  function setAllPatterns(patterns) {
    _imgDetectionPlugin.setPatterns(patterns, function(success){console.log(success);}, function(error){console.log(error);});
  }

  function toDataUrl() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL("image/jpeg", 0.8);

    if (typeof _imgDetectionPlugin == 'undefined') return;

    _patternsHolder.push(dataURL);
    _loadAllImg += 1;
    if(_loadAllImg == _limit){
      console.log("patterns set", _patternsHolder);
      setAllPatterns(_patternsHolder);
    }
    canvas = null;
  };

  function init() {

    console.log('init factoryDetection ..');

    if (typeof ImageDetectionPlugin == 'undefined') return;

    _imgDetectionPlugin = window.pluggins.ImageDetectionPlugin || new ImageDetectionPlugin();
    

    // ------ trigger 1

    _img = new Image();
    _img.crossOrigin = "Anonymous";
    _img.onload = function() {
      toDataUrl(this);
    }

    _img.src = "img/patterns/coke.jpg";

    // ------ trigger 2

    _img = new Image();
    _img.crossOrigin = "Anonymous";
    _img.onload = function() {
      toDataUrl(this);
    }

    _img.src = "img/patterns/sven.jpg";

    // ------ trigger 3

    _img = new Image();
    _img.crossOrigin = "Anonymous";
    _img.onload = function() {
      toDataUrl(this);
    }

    _img.src = "img/patterns/appelsientje.jpg";

    if (typeof ImageDetectionPlugin == 'undefined') return;

    _imgDetectionPlugin.isDetecting(function(data){
      data = JSON.parse(data);
      isDetecting(data);
    }, function(error){
      isNotDetecting();
    });
  }

  function toggleDetection(state) {

    if (typeof _imgDetectionPlugin == 'undefined' || _imgDetectionPlugin.startProcessing == undefined) {
      console.log("_imgDetectionPlugin is not defined!");
      return;
    }

    console.log("toggleDetection->", state);

    _imgDetectionPlugin.startProcessing(state, function(success){console.log(success);}, function(error){console.log(error);});
  }

  function detectionTimeout(t) {
    if (typeof _imgDetectionPlugin == 'undefined' || _imgDetectionPlugin.startProcessing == undefined) {
      console.log("_imgDetectionPlugin is not defined!");
      return;
    }

    _imgDetectionPlugin.setDetectionTimeout(t, function(success){console.log(success);}, function(error){console.log(error);});
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
    detectionTimeout: detectionTimeout
    //removeLastTrigger: isNotDetecting
  };
}

/**
 * Created by njorge on 4/4/2016.
 */