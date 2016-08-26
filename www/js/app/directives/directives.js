angular
	.module('app.directives', [])
  .directive('elLangSelect', elLangSelect)
  .directive('elPopup', elPopup)
	.directive('elInfo', elInfo)
	.directive('elSwipeArea', elSwipeArea)
	.directive('elTriggeredSven', elTriggeredSven)
	.run(init);

function elLangSelect($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
      console.log("inside splash directive ..");
    },
    link: function (scope, element, attrs) {
      scope.lang = 'partials/lang-select.html';
    },
    replace: true,
    template: '<ng-include src="lang"></ng-include>'
  }
}

function elPopup($timeout) {
  return {
    restrict: 'E',
    controller: function ($scope, $element, $attrs) {
    },
    link: function (scope, element, attrs) {
      scope.popup = 'partials/popup.html';
    },
    replace: true,
    template: '<ng-include src="popup"></ng-include>'
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
