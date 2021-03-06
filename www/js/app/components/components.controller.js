angular
	.module('app.components', [])
  .controller('MenuTopCtrl', MenuTopCtrl)
  .controller('MenuBottomCtrl', MenuBottomCtrl)
  .controller('PopupCtrl', PopupCtrl)
  .controller('InfoCtrl', InfoCtrl)
  .controller('TriggeredSvenCtrl', TriggeredSvenCtrl)
  .controller('TriggeredSodaCtrl', TriggeredSodaCtrl)
  .run(init);

function MenuTopCtrl($rootScope, $scope, $element, factoryData, factoryDetection, $timeout) {

  var _interact = true,
      _toggleOpen,
      _active;

  function reset() {
    _active = _toggleOpen = null;
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

  $scope.toggleOpen = function() {
    if (_toggleOpen) return;
    _toggleOpen = true;
    $($element).find('.el-menu.top').removeClass('closed');
    $($element).find('.el-menu-open').addClass('closed');
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

  $rootScope.$on('topMenuOpen', function (event) {
    $scope.toggleOpen();
  });

  $rootScope.$on('topMenuReset', function (event, igoneToogle) {

    igoneToogle = igoneToogle || false;

    if (!$($element).find('.el-menu').hasClass('closed') && !igoneToogle)
      $scope.toggle();

    reset();
  });
}

function MenuBottomCtrl($rootScope, $scope, $element, $timeout, factoryData, factoryDetection) {

  var _interact = true,
      _active,
      _lastVideo,
      _timeout;

  function activeTriggerTab(el) {
    if (!_interact) return;
    _interact = false;

    activeTriggerStatus(false);
    startPopupCountdown();

    factoryDetection.toggleDetection(true);

    //var setTrigger = !!el;

    _active = el = el || $($element).find('li').eq(factoryDetection.activeTrigger.index);
    $($element).find('li').removeClass('active');
    el.addClass('active');

    //if (setTrigger)
    factoryDetection.activeTrigger = {index: el.index()};

    $rootScope.$broadcast(factoryDetection.activeTrigger.index > 0 ? 'menuClose' : 'menuOpen');

    $timeout(function() {
      _interact = true;
    }, 500);
  }

  function startPopupCountdown() {
    console.log('starting popup cowntdown ..');

    clearTimeout(_timeout);

    _timeout = setTimeout(function(){
      $rootScope.$broadcast('showInfoPopup');
    }, 20 * 1000);
  }

  function activeTriggerStatus(status) {
    if (_active === undefined) return;
    var el = _active.find('.el-menu-selected');
    status ? el.addClass('active') : el.removeClass('active');
  }

  $scope.menus = factoryData.menus.bottom;

  $scope.click = function(e) {
    var el = $(e.currentTarget);
    if (el.data('menuIndex') == 0 && _lastVideo) {
      $rootScope.$broadcast('videoClose');
      $rootScope.$broadcast('topMenuReset');
      return;
    }
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

  $rootScope.$on('videoStarted', function (event, active) {
    _lastVideo = active;
    activeTriggerStatus(true);
  });

  $rootScope.$on('videoEnded', function (event) {
    _lastVideo = null;
  });

  $rootScope.$on('videoClose', function (event) {
    activeTriggerStatus(false);
  });

  $rootScope.$on('TRIGGER_DETECTED', function (event) {
    clearTimeout(_timeout);
  });

  $rootScope.$on('playVideo', function (event) {
    clearTimeout(_timeout);
  });

  startPopupCountdown();
}

function PopupCtrl($rootScope, $scope, $element, $timeout, factoryData, factoryDetection) {
  $scope.close = function(e) {
    $($element).hide();
  };

  $scope.open = function(e) {
    $($element)
      .find('.panel-body').html(factoryData.triggers[factoryDetection.activeTrigger.index].info);

    $($element)
      .fadeIn();
  };

  $rootScope.$on('showInfoPopup', function (event) {
    $scope.open();
  });

  $rootScope.$on('TRIGGER_DETECTED', function (event) {
    $scope.close();
  });

  $scope.close();
}

function InfoCtrl($rootScope, $scope, $element, $timeout, factoryDetection) {

  $(window).on('resize', function(e){
    $($element).css('left', $(e.currentTarget).width());
  });

  $scope.open = function(e) {
    factoryDetection.toggleDetection(false);
    $($element).css({'left' : '0px', 'opacity' : 1});
  };

  $scope.close = function(e) {
    factoryDetection.toggleDetection(true);
    $($element).find('.content').scrollTop(0);
    $($element).css({'left' : $($element).width() + 'px', 'opacity' : 1});
    $timeout(function(){
      $($element).addClass('animated');
    });
  };

  $scope.services = function(e) {
    var el = $(e.currentTarget);
    window.open = typeof cordova != "undefined" ? cordova.InAppBrowser.open : window.open;
    window.open(el.data('url'), '_system', 'location=no');
  };

  $rootScope.$on('infoOpen', function () {
    //$scope.open();
  });

  $scope.close();

  $rootScope.$on('toggleInfo', function (e, status) {
    var close = function() {
      $scope.close();
      $($element).hide()
    };
    status ? $($element).show() : close();
  });
}

function TriggeredSvenCtrl($rootScope, $scope, $element, $timeout, factoryDetection) {

  window.videos = [];
  var active;

  function toggleControls(visible) {
    visible ? $($element).find('.play').fadeIn(200) : $($element).find('.play').fadeOut(50);
    //$($element).find('.controls').
  }

  function resetVideo() {
    $rootScope.$broadcast('videoEnded');
    $('#sven-video').attr('src', '');
    var el = $($element);
    el.find('.mid-layer').addClass('hidden');
    el.find('.vid-layer').addClass('hidden');
    active = null;
  }

  function loadVideos() {

    $.each(Config.triggers.sven.videos, function(i, el) {
      window.videos.push(el);
    });
  }

  function togglePause() {
    active.firstTime = false;
    var v = $($element).find('video').get(0);
    v.paused ? v.play() : v.pause();
  }

  function playVideo(index) {

    $rootScope.$broadcast('toggleInfo', false);
    factoryDetection.toggleDetection(false);

    resetVideo();

    var el = $($element), interval = true;

    el.show();

    $timeout(function(){
      el.find('.mid-layer').removeClass('hidden');
    }, Config.triggers.sven.transition);
    $timeout(function(){
      el.find('.vid-layer').removeClass('hidden');
    }, Config.triggers.sven.transition * 2);

    index = index || 0;

    active = videos[index];
    active.menuIndex = index;
    active.firstTime = true;
    $('#sven-video').attr('src', active.url);

    $timeout(function(){
      $('#sven-video').addClass('visible');
    }, 100);
  }

  $scope.togglePause = function(e) {
    togglePause();
  };

  $scope.open = function () {
    playVideo();
  };

  $scope.close = function (disable) {

    detection = disable ? false : true;

    $rootScope.$broadcast('toggleInfo', true);
    factoryDetection.toggleDetection(detection);

    $($element)
      .hide()
      .find('.mid-layer, .vid-layer').addClass('hidden');

    resetVideo();
  };

  $rootScope.$on(factoryDetection.eventName + '0:true', function () {

    $rootScope.$broadcast('videoEnded');

    //factoryDetection.toggleDetection(false);

    $timeout(function(){
      $scope.open();
    }, 100);
  });

  $rootScope.$on(factoryDetection.eventName + '0:false', function () {
    $scope.close();
  });

  $rootScope.$on('videoClose', function () {
    $scope.close();
  });

  $scope.$on('playVideo', function (e, index) {
    console.log("PLAY_VIDEO", index);
    playVideo(index);
  });

  loadVideos();

  $scope.close();

  $('#sven-video')
    .on('timeupdate', function(){
      if (!active) return;
      if (this.currentTime > active.trigger && !!active.trigger) {
        $rootScope.$broadcast('topMenuOpen');
      }
    })
    .off('play').on('play', function() {
      toggleControls(false);
      $rootScope.$broadcast('videoStarted', active);
    })
    .off('pause').on('pause', function() {
      toggleControls(true);
    })
    .off('ended').on('ended', function() {
      console.log('video ended!');
      $rootScope.$broadcast('videoClose');
      $rootScope.$broadcast('topMenuReset', true);
      $scope.close(true);
      //factoryDetection.toggleDetection(true);
      //$rootScope.$broadcast('videoEnded');
    });
}

function TriggeredSodaCtrl($rootScope, $scope, $element, $timeout, factoryData, factoryDetection) {

  $($element).find('.container').css({'background-color' : Config.triggers.soda.backgroundColor});

  var anims = [];

  function clearAnims() {
    for (var i = 0; i < anims.length; i++) {
      $timeout.cancel(anims[i]);
    }
    anims = [];
  }

  function triggerOn() {
    $scope.info = factoryDetection.activeTrigger.index == 1 ? factoryData.info.soda : factoryData.info.appelsientje;
    $scope.$apply();
    factoryDetection.detectionTimeout(5);
    $scope.open();
    $timeout(function(){
      $scope.anim();
    }, 200);
  }

  function triggerOff() {
    $scope.close();
    $scope.reset();
  }

  $scope.info = factoryData.info.soda;

  $scope.last = function(last) {
    return last ? 'bold' : '';
  };

  $scope.close = function(e) {
    $rootScope.$broadcast('toggleInfo', true);
    $($element).css({'left' : $($element).width() + 'px', 'opacity' : 0});
  };

  $scope.open = function(e) {
    $($element).show();
    $rootScope.$broadcast('toggleInfo', false);
    $scope.reset();
    $($element).css({'left' : '0px', 'opacity' : 1, 'z-index' : 2});
  };

  $scope.anim = function() {

    var index = 4,
        ssc = $('.soda-sugar-cube');

    $.each(ssc, function(i, el) {
      index++;
      if (i >= parseInt($(el).parent().attr('data-sugar-cubes'))) return;

      anims.push($timeout(function(){
        $(el).removeClass('drop');
      }, i * Config.triggers.soda.sugarCubes.anim.interval));
    });

    // line animations for Coke trigger
    if (factoryDetection.activeTrigger.index == 1) {
      ssc.last().one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
        function () {
          var line = $('.line');

          line.first()
            .css('top', Math.round($('.container img:nth-child(5)').offset().top + 2) + 'px')
            .addClass('active')
            .find('div').text('25cl');

          line.last()
            .css('top', Math.round($('.container img:nth-child(6)').offset().top - 5) + 'px')
            .addClass('active');
        });
    }

    // line animations for Appelsientje trigger
    if (factoryDetection.activeTrigger.index == 2) {

      $(ssc.get(7)).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
        function () {
          var line = $('.line');

          line.first()
            .css('top', Math.round($('.container img:nth-child(4)').offset().top - 5) + 'px')
            .addClass('active')
            .find('div').text('20cl');
        });
    }

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

    $('.line').removeClass('active');

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

  $rootScope.$on(factoryDetection.eventName + '1:true', triggerOn);
  $rootScope.$on(factoryDetection.eventName + '1:false', triggerOff);
  $rootScope.$on(factoryDetection.eventName + '2:true', triggerOn);
  $rootScope.$on(factoryDetection.eventName + '2:false', triggerOff);

  $scope.close();
  $scope.reset();
}

function init($rootScope) {
}
