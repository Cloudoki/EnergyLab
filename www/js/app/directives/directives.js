angular
	.module('app.directives', [])
  .directive('elSplash', elSplash)
	.directive('elMenuTop', elMenuTop)
	.directive('elMenuBottom', elMenuBottom)
	.directive('elInfo', elInfo)
	.directive('elSwipeArea', elSwipeArea)
	.directive('elTriggeredSven', elTriggeredSven)
	.directive('elTriggeredSoda', elTriggeredSoda)
  .directive('elSodaSugarCube', elSodaSugarCube)
  .directive('elSodaInfo', elSodaInfo)
	.run(init);

function elSplash($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
      console.log("inside splash directive ..");
    },
    link: function (scope, element, attrs) {
      scope.template = 'partials/splash.html';
    },
    replace: true,
    template: '<ng-include src="template"></ng-include>'
  }
}

function elMenuTop($timeout, factoryData) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
    },
    link: function (scope, element, attrs) {
      scope.menuTop = 'partials/menu.top.html';
    },
    replace: true,
    template: '<ng-include src="menuTop"></ng-include>'
  }
}

function elMenuBottom($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
    },
    link: function (scope, element, attrs) {
      scope.menuBottom = 'partials/menu.bottom.html';
    },
    replace: true,
    template: '<ng-include src="menuBottom"></ng-include>'
  }
}

function elInfo($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
    },
    link: function (scope, element, attrs) {
      scope.info = 'partials/info.html';
    },
    replace: true,
    template: '<ng-include src="info"></ng-include>'
  }
}

function elSwipeArea($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
    },
    link: function (scope, element, attrs) {
      scope.swipeArea = 'partials/swipe.area.html';
    },
    replace: true,
    template: '<ng-include src="swipeArea"></ng-include>'
  }
}

function elTriggeredSven($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
    },
    link: function (scope, element, attrs) {
      scope.triggeredSven = 'partials/triggered.sven.html';
    },
    replace: true,
    template: '<ng-include src="triggeredSven"></ng-include>'
  }
}

function elTriggeredSoda($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
    },
    link: function (scope, element, attrs) {
      scope.triggeredSoda = 'partials/triggered.soda.html';
    },
    replace: true,
    template: '<ng-include src="triggeredSoda"></ng-include>'
  }
}

function elSodaSugarCube($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
    },
    link: function (scope, element, attrs) {
    },
    replace: true,
    template: '<img class="soda-sugar-cube" src="img/sugar-cube.png" alt=""/>'
  }
}

function elSodaInfo($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
    },
    link: function (scope, element, attrs) {
    },
    replace: true,
    template: '<div class="info-panel"><span class="name">{{data.name}}</span><span class="value">{{data.value}}</span></div>'
  }
}

function addNewDirective($timeout) {
	return {
		restrict: 'A',
		controller: function ($scope, $element, $attrs) {

		},
		link: function (scope, element, attrs) {

			/*scope.$watch("item", function (newValue, oldValue) {
				scope.total = newValue.qtdeDeBM * newValue.qtdePorBM;
			}, true);*/
		}
	}
}

function init($templateRequest, $compile, $rootScope) {
	console.log("init directives ..");
}
