angular
    .module('app.filters', [])
    .run(init)
    .filter('websiteName', websiteName);

function websiteName() {
  return function(input) {
    return input.replace(/.*?:\/\//g, "");
  };
}

function init() {
    console.log("init filters ..");
}
