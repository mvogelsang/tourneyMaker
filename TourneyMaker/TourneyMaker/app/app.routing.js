var TourneyMaker;
(function (TourneyMaker) {
    TourneyMaker.app.config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
            templateUrl: 'app/home/home.tpl.html',
            controller: TourneyMaker.HomeController,
            controllerAs: 'vm'
        })
            .when('/dashboard/:id', {
            templateUrl: 'app/dashboard/dashboard.tpl.html',
            controller: TourneyMaker.DashboardController,
            controllerAs: 'vm'
        })
            .when('/dashboard/:id/active-tournaments', {
            templateUrl: 'app/dashboard/active-tournaments/active-tournaments.tpl.html',
            controller: TourneyMaker.ActiveTournamentsController,
            controllerAs: 'vm'
        })
            .when('/dashboard/:id/completed-tournaments', {
            templateUrl: 'app/dashboard/completed-tournaments/completed-tournaments.tpl.html',
            controller: TourneyMaker.DashboardController,
            controllerAs: 'vm'
        })
            .when('/dashboard/:id/profile', {
            templateUrl: 'app/dashboard/profile/profile.tpl.html',
            controller: TourneyMaker.DashboardController,
            controllerAs: 'vm'
        })
            .when('/dashboard/:id/tournament-management', {
            templateUrl: 'app/dashboard/tournament-management/tournament-management.tpl.html',
            controller: TourneyMaker.DashboardController,
            controllerAs: 'vm'
        })
            .when('/dashboard/:id/create-tournament', {
            templateUrl: 'app/dashboard/create-tournament/create-tournament.tpl.html',
            controller: TourneyMaker.CreateTournamentController,
            controllerAs: 'vm'
        })
            .when('/dashboard/:id/edit-tournament/:id', {
            templateUrl: 'app/dashboard/create-tournament/create-tournament.tpl.html',
            controller: TourneyMaker.CreateTournamentController,
            controllerAs: 'vm'
        })
            .when('/dashboard/:id/view-tournament/:id', {
            templateUrl: 'app/dashboard/view-tournament/view-tournament.tpl.html',
            controller: TourneyMaker.ViewTournamentController,
            controllerAs: 'vm'
        })
            .otherwise({ redirectTo: '/home' });
    });
})(TourneyMaker || (TourneyMaker = {}));
