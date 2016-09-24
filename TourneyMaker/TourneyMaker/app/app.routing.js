var TourneyMaker;
(function (TourneyMaker) {
    TourneyMaker.app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
            templateUrl: 'app/home/home.tpl.html',
            controller: TourneyMaker.HomeController,
            controllerAs: 'vm'
        })
            .when('/second-page', {
            template: '<div class="jumbotron"><h3>Second Page</h3></div>'
        })
            .when('/third-page', {
            template: '<div class="jumbotron"><h3>Third Page</h3></div>'
        })
            .when('/create', {
            templateUrl: 'app/create-tournament/create-tournament.tpl.html',
            controller: TourneyMaker.CreateTournamentController,
            controllerAs: 'vm'
        })
            .otherwise({ redirectTo: '/home' });
        //removes the #/ from the URL to prettify it
        $locationProvider.html5Mode(true);
    });
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=app.routing.js.map