angular.module('starter.controllers', [])

.controller("ExampleController", function ($scope) {

  navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

  var stream = undefined;
  console.log(navigator.getUserMedia);

  $scope.startCam = function () {

    if(navigator.getUserMedia) {
      navigator.getUserMedia({ audio: false, video: true },
        function(mediaStream) {
          stream = mediaStream;
          var video = document.querySelector('video');
          video.src = window.URL.createObjectURL(mediaStream);
          video.onloadedmetadata = function(e) {
            var canvas = document.querySelector('canvas');
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
            video.play();
          };
          video.addEventListener('play', function() {
            console.log('play', this.videoWidth, this.videoHeight);
            draw();
          }, false);
        },
        function(err) {
          console.log("The following error occurred: " + err.name);
        }
      );

    function draw() {
        var canvas = document.querySelector('canvas');
        var canvas_cxt = canvas.getContext('2d');
        var video = document.querySelector('video');

        if (video.paused || video.ended) {
            console.log("pause || stopped");
            return false;
        }

        canvas_cxt.drawImage(video, 0, 0);

        setTimeout(function() {
            window.requestAnimationFrame(draw);
        }, 1000 / 30);
    };
    }
  };

  $scope.stopCam = function () {
    if (stream) {
      var video = document.querySelector('video');
      var canvas = document.querySelector('canvas');
      var canvas_cxt = canvas.getContext('2d');
      stream.getTracks()[0].stop();
      video.pause();
      canvas_cxt.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

});
