//the instantiation of our app, this is loaded in html in the html bracket
var TourneyMaker;
(function (TourneyMaker) {
    TourneyMaker.app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ngMessages', 'ngCookies']);
})(TourneyMaker || (TourneyMaker = {}));
