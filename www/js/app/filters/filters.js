angular
    .module('app.filters', [])
    .run(init)
    .filter('sugarCubes', sugarCubes);

function sugarCubes() {
  return function(input) {
    return _.find(input, { 'key': 'foodSugarCubes'}).value;
  };
}

function init() {
    console.log("init filters ..");
}
