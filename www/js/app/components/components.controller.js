angular
	.module('app.components', [])
  .controller('LangSelectCtrl', LangSelectCtrl)
  .controller('PopupCtrl', PopupCtrl)
  .controller('InfoCtrl', InfoCtrl)
  .controller('TriggeredSvenCtrl', TriggeredSvenCtrl)
  .run(init);

function LangSelectCtrl($rootScope, $scope, $element, $timeout, factoryData, factoryDetection) {

  if (window.localStorage && window.localStorage.lang) {
    $rootScope.activeLang = window.localStorage.lang;
    $($element).remove();

    $timeout(function () {
      factoryDetection.init();
    }, 1000);
  }

  $scope.select = function(e) {

    factoryDetection.init();

    $rootScope.activeLang = $(e.currentTarget).data('lang');

    if (window.localStorage)
      window.localStorage.lang = $rootScope.activeLang;

    $($element).remove();

    $rootScope.$broadcast("popupStart");
  };
}

/* ============================================== */

function PopupCtrl($rootScope, $scope, $element, $timeout, factoryData, factoryDetection) {
  var timeout;

  function startPopupCountdown() {
    if (!$rootScope.activeLang) return;

    console.log('started popup cowntdown ..');

    clearTimeout(timeout);

    timeout = setTimeout(function(){
      $rootScope.$broadcast('showInfoPopup');
    }, 15 * 1000);
  }

  $scope.close = function(e) {
    $($element).hide();
    startPopupCountdown();
  };

  $scope.open = function(e) {
    var info = {
      title: {
        nl: 'Wist je dat',
        fr: 'Saviez-vous'
      },
      msg: {
        nl: 'Probeer iets verderaf of dichterbij te scannen voor een optimaal resultaat.',
        fr: 'Placez votre téléphone plus près ou plus loin pour un résultat optimal.'
      }
    }

    $($element)
      .find('.panel-header').html(info.title[$rootScope.activeLang])

    $($element)
      .find('.panel-body').html(info.msg[$rootScope.activeLang]);

    $($element)
      .fadeIn();
  };

  $rootScope.$on('showInfoPopup', function (event) {
    $scope.open();
  });

  $rootScope.$on('popupStart', function (event) {
    startPopupCountdown();
  });

  $rootScope.$on('popupStop', function (event) {
    console.log('stoped popup cowntdown ..');
    clearTimeout(timeout);
  });  

  $rootScope.$on('TRIGGER_DETECTED', function (event) {
    $scope.close();
  });

  $scope.close();
}

/* ============================================== */

function InfoCtrl($rootScope, $scope, $element, $timeout, factoryDetection) {

   $rootScope.$watch(
      "activeLang",
      function handleLangChange( newValue, oldValue ) {
        $scope.content.title.active = $scope.content.title[$rootScope.activeLang];
        $scope.content.title_text.active = $scope.content.title_text[$rootScope.activeLang];
        $scope.content.text.active = $scope.content.text[$rootScope.activeLang];
        $scope.content.button.caption.active = $scope.content.button.caption[$rootScope.activeLang];
      }
  );

  $scope.social = {
    website: 'http://www.onemileaday.be',
    facebook: 'https://www.facebook.com/OneMileADay.be',
    twitter: 'https://twitter.com/OneMileADay'
  };

  $scope.content = {
    title: {
      nl: 'One Mile A Day',
      fr: 'One Mile A Day',
      active: ''
    },
    title_text: {
      nl: 'Over One Mile a Day',
      fr: 'A propos de One Mile a Day',
      active: ''
    },
    text: {
      nl: 'Het doel van ‘One Mile a Day’ is simpel: de lange inactieve blokken op school doorbreken met een korte, maar dagelijkse bewegingsactiviteit met de hele klas. De kinderen van de lagere school gaan samen met hun leerkracht 1 mijl (1,6 km) lopen of wandelen in de frisse buitenlucht. Nadien wordt de klasactiviteit gewoon hervat. Het project, dat in Schotland zijn oorsprong vond, heeft daar aangetoond dat de kinderen na ‘de mile’ de lesactiviteiten met meer energie en concentratie hervatten.',
      fr: 'L’objectif de « One Mile a Day » est simple : interrompre les longues périodes d’inactivité à l’école par une activité physique, brève mais quotidienne, avec l’ensemble de la classe. Les élèves de l’école primaire sortent en plein air avec leur enseignant pour courir ou marcher sur une distance de 1 mile (1,6 km). Les cours reprennent ensuite normalement. Le projet, qui trouve son origine en Écosse, a démontré que, après le « mile », les élèves reprennent les cours en étant détendus et davantage concentrés.',
      active: ''
    },
    button: {
      caption: {
        'nl': 'Bezoek de website',
        'fr': 'Visitez notre site Web',
        active: ''
      },
      link: 'http://onemileaday.be'
    }
  };

  $(window).on('resize', function(e){
    $($element).css('left', $(e.currentTarget).width());
  });

  $scope.open = function(e) {
    $rootScope.$broadcast('popupStop');
    $($element).addClass('open');
    factoryDetection.toggleDetection(false);
    $($element).css({'left' : '0px', 'opacity' : 1});
  };

  $scope.close = function(e) {
    $rootScope.$broadcast('popupStart');
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

  $rootScope.$on('toggleInfo', function (e, status) {
    var close = function() {
      $scope.close();
      $($element).hide()
    };
    status ? $($element).show() : close();
  });

  $scope.close();
}

/* ============================================== */

function TriggeredSvenCtrl($rootScope, $scope, $element, $timeout, factoryDetection) {

  window.videos = [];
  var active, videoIndex = 0;

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
    var v = $($element).find('video').get(0);
    v.paused ? v.play() : v.pause();
  }

  function toggleClose(close) {
    if (close) {
      $('.close').removeClass('active');
    } else {
      setTimeout(function(){
        $('.close').addClass('active');
      }, 1500);
    }
  }

  function playVideo() {

    $rootScope.$broadcast('toggleInfo', false);
    $rootScope.$broadcast('popupStop');
    
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


    active = videos[videoIndex];

    var vid = $('#sven-video');

    vid.attr('src', active.url[$rootScope.activeLang]);

    active.loop ? vid.attr('loop', '') : vid.removeAttr('loop');
    active.loop ? vid.addClass('loop') : vid.removeClass('loop');

    if (active.landscape && screen.lockOrientation)
      screen.lockOrientation('landscape');
    

    $timeout(function(){
      $('#sven-video').addClass('visible');
    }, 100);
  }

  $scope.togglePause = function(e) {
    togglePause();
  };

  $scope.open = function () {
    playVideo();

    toggleClose();
  };

  $scope.close = function (e, disable) {

    if (screen.lockOrientation)
      screen.lockOrientation('portrait');

    if (e)
      e.stopPropagation();

    detection = disable ? false : true;

    $rootScope.$broadcast('toggleInfo', true);
    factoryDetection.toggleDetection(detection);

    $($element)
      .hide()
      .find('.mid-layer, .vid-layer').addClass('hidden');

    resetVideo();

    toggleClose(true);

     $rootScope.$broadcast('popupStart');
  };

  $rootScope.$on('TRIGGER_DETECTED', function (event, index) {

    $rootScope.$broadcast('videoEnded');
    videoIndex = index;

    $timeout(function(){
      $scope.open();
    }, 100);
    
  });

  /*$rootScope.$on(factoryDetection.eventName + '0:true', function () {

    $rootScope.$broadcast('videoEnded');

    //factoryDetection.toggleDetection(false);

    $timeout(function(){
      $scope.open();
    }, 100);
  });*/

  /*$rootScope.$on(factoryDetection.eventName + '0:false', function () {
    $scope.close();
  });*/

  $rootScope.$on('videoClose', function () {
    $scope.close();
  });

  loadVideos();

  $scope.close();

  $('#sven-video')
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
      $scope.close(null, true);
      //factoryDetection.toggleDetection(true);
      //$rootScope.$broadcast('videoEnded');
    });
}


/* ============================================== */

function init($rootScope) {
  //$rootScope.activeLang = 'nl';
}
