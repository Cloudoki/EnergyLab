// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

      var video = document.querySelector('video');
      var videoplayback = document.querySelector('video#show');
      var canvas = window.canvas = document.createElement('canvas');
      var defaultVideo = '';
      var cameraIds = [];
      var markersBuffer = [];
      var current = 0;
      var videoSource = undefined;
      var animationID = undefined;
      var detector = undefined;
      var oldTime = 0;
      var threshold = 250;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      //videoplayback.src = defaultVideo;


      function gotSources(sourceInfos) {
        for (var i = 0; i !== sourceInfos.length; ++i) {
          var sourceInfo = sourceInfos[i];
          var id = sourceInfo.id;
          if (sourceInfo.kind === 'video') {
            cameraIds.push(id);
          } else {
            console.log('Some other kind of source: ', sourceInfo);
          }
        }
        videoSource = cameraIds[current];
      }

      function successCallback(stream) {
        window.stream = stream; // make stream available to browser console
        video.src = window.URL.createObjectURL(stream);
        video.onloadedmetadata = function(e) {
          this.play();
       };
      }

      function errorCallback(error) {
        console.log('navigator.getUserMedia error: ', error);
      }

      function onStartCamera() {
        console.log('start');
        var constraints = {
        audio: false,
        video: {
            optional: [{
              sourceId: videoSource
            }]
          }
        };
        // var tapEnabled = false;
        // var dragEnabled = false;
        // var toBack = true;
        // var rect = {x: 0, y: 0, width: window.innerWidth, height: window.innerHeight};
        // cordova.plugins.camerapreview.startCamera(rect, "back", tapEnabled, dragEnabled, toBack);
        // cordova.plugins.camerapreview.show();
        navigator.webkitGetUserMedia(constraints, successCallback, errorCallback);
        detector = new AR.Detector();
      }

      function onSwitchCamera () {
        current = current === 0 ? 1 : 0;
        videoSource = cameraIds[current];
        onStopCamera();
        onStartCamera();
      }

      function onStopCamera() {
        console.log('stop');
        // cordova.plugins.camerapreview.stopCamera();
        // cordova.plugins.camerapreview.hide();
        video.pause();
        window.stream.getTracks()[0].stop();
        window.cancelAnimationFrame(animationID);
      }

      function playVideo() {
        var playing = !videoplayback.paused && !videoplayback.ended;
        if(!playing) {// && videoplayback.src === defaultVideo) {
          videoplayback.src = 'video/small.ogv';
          videoplayback.load();
          videoplayback.oncanplay = function(e) {
            videoplayback.play();
            console.log('playing video');
          };
        }
      }

      function stopVideo() {
        if(!videoplayback.paused && !videoplayback.ended) {
          videoplayback.pause();
          videoplayback.src = defaultVideo;
          console.log('pause video');
        }
      }

      function detecting() {
        return markersBuffer.reduce(function(previousValue, currentValue) {
          return previousValue + currentValue;
        }) > 1;
      }

      function draw () {
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var markers = detector.detect(imageData);
        markersBuffer.push(markers.length);
        if(markersBuffer.length > 10) {
          markersBuffer.shift();
        }
        if(detecting()){
          videoplayback.className = "show";
          playVideo();
        } else {
          videoplayback.className = "hide";
          stopVideo();
        }
        if (video.paused || video.ended) {
            console.log('pause || stopped');
            return false;
        }
        animationID = window.requestAnimationFrame(function anim(timestamp) {
          if(timestamp - oldTime > threshold) {
            oldTime = timestamp;
            draw();
          } else {
            window.requestAnimationFrame(anim);
          }
        });
      }

      MediaStreamTrack.getSources(gotSources);

      video.addEventListener('play', function (e) {
        draw();
      });

      document.getElementById('startCameraButton').addEventListener('click', onStartCamera, false);
      document.getElementById('switchCameraButton').addEventListener('click', onSwitchCamera, false);
      document.getElementById('stopCameraButton').addEventListener('click', onStopCamera, false);

    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
