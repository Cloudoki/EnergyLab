angular
    .module('app.filters', [])
    .run(init)
    .filter('name', name)
    .filter('change', change)
    .filter('serialize', serialize)
    .filter('type', type)
    .filter('buttonIconClass', buttonIconClass)
    .filter('mediatekaItem', mediatekaItem);

function name() {
    return function(input) {
        return input.split('|')[0];
    };
}
function change() {
    return function(input) {
        return input ? '; ' + input + '(item)' : '';
    };
}
function serialize() {
    return function(input) {
        return input.serialize();
    };
}
function type() {
    return function(input) {
        return input == 'email' || 'number' ? 'text' : input;
    };
}
function buttonIconClass() {
    return function(input) {

        if (!input) return;

        var cn = '';

        switch(input.serialize()) {
            case 'add':
                cn = 'fa fa-plus';
                break;
            case 'edit':
                cn = 'fa fa-pencil';
                break;
            case 'delete':
                cn = 'fa fa-times';
                break;
            case 'upload':
                cn = 'fa fa-upload';
                break;
        }
        return cn;
    };
}
function mediatekaItem() {
    return function(input) {
        return {id:input.id, url:input.url};
    };
}
function init() {
    console.log("init filters ..");
}