angular
    .module('app.factory.data', [])
    .factory('factoryData', factoryData);

function factoryData($http) {

    console.log('factoryData begin ..');

    var _menuData = {},
        _triggerData = {},
        _info = {};

    function initAppData() {

      // menu assets
      $http.get("templates/app-data.json")
        .then(function (res) {
          _menuData = res.data.menus;
          _triggerData = res.data.triggers;
          _info = res.data.info;
        }, function (err) {
          console.log("ERROR", err.data);
        });
    }

    initAppData();

    return {
        //set menus(data) { _menuData = data; },
        get menus() { return _menuData; },
        get triggers() { return _triggerData; },
        get info() { return _info; }
    };
}

