angular
    .module('app.filters', [])
    .run(init)
    .filter('name', name);

function name() {
    return function(input) {
        return input.split('|')[0];
    };
}

function init() {
    console.log("init filters ..");
}
