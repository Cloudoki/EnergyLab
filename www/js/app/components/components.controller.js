angular
	.module('app.components', [])
  .controller('MenuTopCtrl', MenuTopCtrl)
  .controller('MenuBottomCtrl', MenuBottomCtrl)
  .controller('InfoCtrl', InfoCtrl)
  .controller('TriggeredSvenCtrl', TriggeredSvenCtrl)
  .controller('TriggeredSodaCtrl', TriggeredSodaCtrl)
	.run(init);

function MenuTopCtrl($rootScope, $scope, $element, factoryData) {

  $scope.menus = factoryData.menus.top;

  $scope.click = function(e) {
    console.log('TODO:// add code for MenuTopCtrl click here ..',
      $(e.currentTarget).data('menuIndex'),
      $(e.currentTarget).data('menuName')
    );
  };

  $scope.open = function() {
    //$($element).find('.el-menu.top').removeClass('closed');
    $($element).find('.el-menu-open').removeClass('closed');
  };

  $scope.close = function() {
    $($element).find('.el-menu.top').addClass('closed');
    $($element).find('.el-menu-open').addClass('closed');
  };

  $scope.toggle = function() {
    var mt = $($element).find('.el-menu.top');
    var mb = $($element).find('.el-menu-open');

    mt.hasClass('closed') ? mt.removeClass('closed') : mt.addClass('closed');
    mb.hasClass('closed') ? mb.removeClass('closed') : mb.addClass('closed');
  };

  $scope.onSwipeUp = function() {
    $scope.toggle();
  };

  $scope.onSwipeDown = function() {
    $scope.toggle();
  };

  $rootScope.$on('menuOpen', function (event) {
    if ($rootScope.activeTrigger > 0) return;
    $scope.open();
  });

  $rootScope.$on('menuClose', function (event) {
    $scope.close();
  });
}

function MenuBottomCtrl($rootScope, $scope, $element, $timeout, factoryData, factoryUtils) {

  var _interact = true;

  function activeTriggerTab(el) {
    if (!_interact) return;
    _interact = false;

    el = el || $($element).find('li').eq($rootScope.activeTrigger);
    $($element).find('li').removeClass('active');
    el.addClass('active');
    $rootScope.activeTrigger = el.index();

    $rootScope.$broadcast($rootScope.activeTrigger > 0 ? 'menuClose' : 'menuOpen');
    $rootScope.$broadcast($rootScope.activeTrigger == 1 ? 'sodaOpen' : 'sodaClose');
    $rootScope.$broadcast($rootScope.activeTrigger == 0 ? 'svenOpen' : 'svenClose');

    $timeout(function() {
      _interact = true;
    }, 200);
  }

  $scope.menus = factoryData.menus.bottom;

  $rootScope.activeTrigger = Config.triggers.defaultActive || 0;

  $scope.click = function(e) {
    var el = $(e.currentTarget);
    if (el.hasClass('active')) return;
    activeTriggerTab(el);
  };

  $scope.onSwipeLeft = function() {
    if ($rootScope.activeTrigger === 0) return;
    $rootScope.activeTrigger--;
    activeTriggerTab();
  };

  $scope.onSwipeRight = function() {
    if ($rootScope.activeTrigger === 2) return;
    $rootScope.activeTrigger++;
    activeTriggerTab();
  };

  $timeout(function(){activeTriggerTab()});
}

function InfoCtrl($rootScope, $scope, $element, $timeout) {
  $scope.close = function(e) {
    $($element).css({'left' : $($element).width() + 'px', 'opacity' : 0});
    $timeout(function(){
      $($element).addClass('animated');
    });
  };

  $scope.services = function(e) {
    console.log('TODO:// add code for services here ..');
  };

  $rootScope.$on('infoOpen', function () {
    $($element).css({'left' : '0px', 'opacity' : 1});
  });

  $scope.close();
}

function TriggeredSvenCtrl($rootScope, $scope, $element, $timeout, factoryUtils) {

  var videos = [],
      _videoIndex = 0;

  function resetVideos() {
    $.each(videos, function(i, el) {
      el.currentTime = 0;
      el.pause();
    });
  }

  function loadVideos() {

    $.each(Config.triggers.sven.videos, function(i, el) {
      var vid = document.createElement("video");
      vid.setAttribute('webkit-playsinline', '');

      vid.muted = false;
      vid.autoplay = false;
      vid.loop = false;
      vid.preload = "auto";
      vid.controls = false;

      var source = document.createElement("source");
      source.src = el;
      source.type = "video/mp4";
      vid.appendChild(source);
      videos.push(vid);
    });

    console.log("->loadVideos");
  }

  function playVideo() {

   /* $($element).find('.vid-layer')
      .html('')
      .append(videos[0]);*/

    $(videos[_videoIndex])
      .off('play').on('play', function() {
        /*var c = $('#vid-canvas').get(0),
            v = $(this).get(0);

        console.log("->play video", v.videoWidth, v.videoHeight);
        c.width = v.videoWidth;
        c.height = v.videoHeight;
        draw(this, c.getContext('2d'), v.videoWidth,  v.videoHeight);*/
      })
      .off('ended').on('ended', function() {
        $scope.close();
      });

    videos[_videoIndex].play();
  }

  function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,20,v,c,w,h);
  }

  $scope.click = function() {
    var v = $($element).find('video').get(0);
    v.paused ? v.play() : v.pause();
  };

  $scope.open = function () {

    var el = $($element);
    el.show();

    $timeout(function(){
      el.find('.mid-layer').removeClass('hidden');
    }, Config.triggers.sven.transition);
    $timeout(function(){
      el.find('.vid-layer').removeClass('hidden');
    }, Config.triggers.sven.transition * 2);
    $timeout(function(){
      el.find('#vid-canvas').removeClass('hidden');
    }, Config.triggers.sven.transition * 3);

    _videoIndex = _videoIndex == Config.triggers.sven.videos.length-1 ? 0 : _videoIndex+1;
    playVideo();
    $($element).find('.vid-layer').append(videos[_videoIndex]);
  };

  $scope.close = function () {
    $($element)
      .hide()
      .find('.mid-layer, .vid-layer').addClass('hidden');

    $($element).find('.vid-layer')
      .html('');

    resetVideos();
  };

  //$scope.close();

  $rootScope.$on('svenOpen', function () {
    $timeout(function(){
      $scope.open();
    }, 100);
  });

  $rootScope.$on('svenClose', function () {
    $scope.close();
  });

  loadVideos();
}

function TriggeredSodaCtrl($rootScope, $scope, $element, $timeout, factoryData) {

  var anims = [];

  function clearAnims() {
    for (var i = 0; i < anims.length; i++) {
      $timeout.cancel(anims[i]);
    }
    anims = [];
  }

  $scope.info = factoryData.info.soda;

  $scope.close = function(e) {
    $($element).css({'left' : $($element).width() + 'px', 'opacity' : 0});
  };

  $scope.open = function(e) {
    $($element).css({'left' : '0px', 'opacity' : 1});
  };

  $scope.anim = function() {
    var index=4;
    $.each($('.soda-sugar-cube'), function(i, el) {
      index++;
      anims.push($timeout(function(){
        $(el).removeClass('drop');
      }, i * Config.triggers.soda.sugarCubes.anim.interval));
    });

    $.each($('.info-panel'), function(i, el) {
      anims.push($timeout(function(){
        $(el).removeClass('off');
      }, (index + i) * Config.triggers.soda.sugarCubes.anim.interval));
    });

    $timeout(function(){
      $($element).find('.content').addClass('shadow');
    }, Config.triggers.soda.sugarCubes.anim.interval * 3);
  };

  $scope.reset = function() {

    $($element).find('.content').removeClass('shadow');

    $('.soda-sugar-cube')
      .removeClass('animated')
      .addClass('drop');

    $('.info-panel')
      .removeClass('animated')
      .addClass('off');

    clearAnims();

    $timeout(function(){
      $('.soda-sugar-cube, .info-panel')
        .addClass('animated');
    });
  };

  $rootScope
    .$on('sodaOpen', function () {
      $scope.open();
      $scope.anim();
    });
  $rootScope
    .$on('sodaClose', function (event) {
      $scope.close();
      $scope.reset();
    });
}

function init() {
}
