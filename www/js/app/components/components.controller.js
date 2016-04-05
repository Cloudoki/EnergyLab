angular
	.module('app.components', [])
  .controller('MenuTopCtrl', MenuTopCtrl)
  .controller('MenuBottomCtrl', MenuBottomCtrl)
  .controller('InfoCtrl', InfoCtrl)
  .controller('TriggeredSvenCtrl', TriggeredSvenCtrl)
  .controller('TriggeredSodaCtrl', TriggeredSodaCtrl)
	.run(init);

function MenuTopCtrl($rootScope, $scope, $element, factoryData, factoryDetection, $timeout) {

  var _interact = true,
      _active;

  function reset() {
    _active = null;
    $($element).find('li').removeClass('active');
  }

  $scope.menus = factoryData.menus.top;

  $scope.click = function(e) {

    var el = $(e.currentTarget),
        index = el.data('menuIndex');

    if (!_interact || _active === index) return;
    _interact = false;

    reset();
    el.addClass('active');

    _active = index;

    $rootScope.$broadcast('playVideo', index);

    $timeout(function() {
      _interact = true;
    }, 1000);
  };

  $scope.open = function() {
    //$($element).find('.el-menu.top').removeClass('closed');
    $($element).find('.el-menu-open').removeClass('closed');
  };

  $scope.close = function() {
    $($element).find('.el-menu.top').addClass('closed');
    $($element).find('.el-menu-open').addClass('closed');
    reset();
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
    if (factoryDetection.activeTrigger.index > 0) return;
    $scope.open();
  });

  $rootScope.$on('menuClose', function (event) {
    $scope.close();
  });

  $rootScope.$on('videoEnded', function (event) {
    reset();
  });
}

function MenuBottomCtrl($rootScope, $scope, $element, $timeout, factoryData, factoryDetection) {

  var _interact = true;

  function activeTriggerTab(el) {
    if (!_interact) return;
    _interact = false;

    var setTrigger = !!el;

    el = el || $($element).find('li').eq(factoryDetection.activeTrigger.index);
    $($element).find('li').removeClass('active');
    el.addClass('active');

    if (setTrigger)
      factoryDetection.activeTrigger = {index: el.index()};

    $rootScope.$broadcast(factoryDetection.activeTrigger.index > 0 ? 'menuClose' : 'menuOpen');
    /*$rootScope.$broadcast(factoryDetection.activeTrigger.index == 1 ? 'sodaOpen' : 'sodaClose');
    $rootScope.$broadcast(factoryDetection.activeTrigger.index == 0 ? 'svenOpen' : 'svenClose');*/

    $timeout(function() {
      _interact = true;
    }, 500);
  }

  $scope.menus = factoryData.menus.bottom;

  $scope.click = function(e) {
    var el = $(e.currentTarget);
    if (el.hasClass('active')) return;
    activeTriggerTab(el);
  };

  $scope.onSwipeLeft = function() {
    if (factoryDetection.activeTrigger.index === 0) return;
    factoryDetection.removeLastTrigger();
    factoryDetection.activeTrigger.index--;
    activeTriggerTab();
  };

  $scope.onSwipeRight = function() {
    if (factoryDetection.activeTrigger.index === 2) return;
    factoryDetection.removeLastTrigger();
    factoryDetection.activeTrigger.index++;
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

function TriggeredSvenCtrl($rootScope, $scope, $element, $timeout, factoryDetection) {

  window.videos = [], window.videoz = [];
  var interact = true;

  /*function resetVideos() {
    $($element).find('.vid-layer')
      .html('');

    $.each(videos, function(i, el) {
      // el.currentTime = 0;
      // el.pause();
			el.load();
      $(el).removeClass('visible');
    });
  }*/

  function resetVideo() {
    $('#sven-video').attr('src', '');
  }

  function loadVideos() {

    $.each(Config.triggers.sven.videos, function(i, el) {
      /*var vid = document.createElement("video");
      vid.setAttribute('webkit-playsinline', '');
      vid.setAttribute('poster', 'img/white-bg.png');

      vid.muted = false;
      vid.autoplay = false;
      vid.loop = false;
      vid.preload = "auto";
      vid.controls = false;

      var source = document.createElement("source");
      source.src = el;
      source.type = "video/mp4";
      vid.appendChild(source);
      videos.push(vid);*/
      window.videoz.push(el);
    });
  }

  function playVideo(index) {

    var el = $($element), interval = true;

    el.show();

    $timeout(function(){
      el.find('.mid-layer').removeClass('hidden');
    }, Config.triggers.sven.transition);
    $timeout(function(){
      el.find('.vid-layer').removeClass('hidden');
    }, Config.triggers.sven.transition * 2);

    //resetVideos();

    index = index || 0;

    /*$(videos[index])
			.on('canplay', function() {
        clearInterval(interval);
				console.log("canplay - ", this);
        var vid = this;
				if(vid.paused || vid.ended) vid.play();
      })
      .on('loadedmetadata', function() {
        clearInterval(interval);
        console.log("loadedmetadata - ", this);
        var vid = this;
        var vidH = vid.videoHeight;
        var vidW = vid.videoWidth;
        vid.height = window.innerHeight;
        vid.width = (vidW * vidH)/window.innerHeight;
        if(vid.paused || vid.ended) vid.play();
      })
      .off('ended').on('ended', function() {
        $rootScope.$broadcast('videoEnded');

        $(videos[index]).removeClass('visible');
        //$scope.close();
        $(videos[index]).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
          function(e) {
            $scope.close();
          });
      })
      .off('click').on('click', function() {
        this.paused ? this.play() : this.pause();
      });*/

    //$($element).find('.vid-layer').append(videos[index]);
    $('#sven-video').attr('src', videoz[index]);

    $timeout(function(){
      $('#sven-video').addClass('visible');
    }, 100);
  }

  $scope.click = function() {
    var v = $($element).find('video').get(0);
    v.paused ? v.play() : v.pause();
  };

  $scope.open = function () {
    playVideo();
  };

  $scope.close = function () {
    $($element)
      .hide()
      .find('.mid-layer, .vid-layer').addClass('hidden');

    //resetVideos();
    resetVideo();
  };

  $rootScope.$on(factoryDetection.eventName + '0:true', function () {
    $timeout(function(){
      $scope.open();
    }, 100);
  });

  $rootScope.$on(factoryDetection.eventName + '0:false', function () {
    $scope.close();
  });

  $scope.$on('playVideo', function (e, index) {
    console.log("PLAY_VIDEO", index+1);
    playVideo(index + 1)
  });

  loadVideos();

  $scope.close();
}

function TriggeredSodaCtrl($rootScope, $scope, $element, $timeout, factoryData, factoryDetection) {

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
    $scope.reset();
    $($element).css({'left' : '0px', 'opacity' : 1, 'z-index' : 2});
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

  $rootScope.$on(factoryDetection.eventName + '1:true', function () {
    $scope.open();
    $timeout(function(){
      $scope.anim();
    }, 200);
  });

  $rootScope.$on(factoryDetection.eventName + '1:false', function (event) {
    $scope.close();
    $scope.reset();
  });

  $scope.close();
  $scope.reset();
}

function init($rootScope) {
}
