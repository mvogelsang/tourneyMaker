var TourneyMaker;
(function (TourneyMaker) {
    TourneyMaker.app.config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
            templateUrl: 'app/home/home.tpl.html',
            controller: TourneyMaker.HomeController,
            controllerAs: 'vm'
        })
            .when('/dashboard', {
            templateUrl: 'app/dashboard/dashboard.tpl.html',
            controller: TourneyMaker.DashboardController,
            controllerAs: 'vm'
        })
            .when('/create-tournament', {
            templateUrl: 'app/create-tournament/create-tournament.tpl.html',
            controller: TourneyMaker.CreateTournamentController,
            controllerAs: 'vm'
        })
            .when('/edit-tournament:{id}', {
            templateUrl: 'app/create-tournament/create-tournament.tpl.html',
            controller: TourneyMaker.CreateTournamentController,
            controllerAs: 'vm'
        })
            .when('/view-tournament', {
            templateUrl: 'app/view-tournament/view-tournament.tpl.html',
            controller: TourneyMaker.ViewTournamentController,
            controllerAs: 'vm'
        })
            .otherwise({ redirectTo: '/home' });
    });
})(TourneyMaker || (TourneyMaker = {}));
