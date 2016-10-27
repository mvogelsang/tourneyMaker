module TourneyMaker {
    app.config(function ($routeProvider) {
        $routeProvider
            //the template and controlller will be loaded based on what is in the URL (ie: the argument in 'when')
            .when('/home', {
                //moved the home into the view so we can store user data in the wrapper controller 'lpc'
                //templateUrl: 'app/home/home.tpl.html',
                //controller: HomeController,
                //controllerAs: 'vm'
            })
            .when('/dashboard/:id', {
                templateUrl: 'app/dashboard/dashboard.tpl.html',
                controller: DashboardController,
                controllerAs: 'vm'
            })
            .when('/dashboard/:id/active-tournaments', {
                templateUrl: 'app/dashboard/active-tournaments/active-tournaments.tpl.html',
                controller: ActiveTournamentsController,
                controllerAs: 'vm'
            })
            .when('/dashboard/:id/completed-tournaments', {
                templateUrl: 'app/dashboard/completed-tournaments/completed-tournaments.tpl.html',
                controller: DashboardController,
                controllerAs: 'vm'
            })
            .when('/dashboard/:id/profile', {
                templateUrl: 'app/dashboard/profile/profile.tpl.html',
                controller: ProfileController,
                controllerAs: 'vm'
            })
            .when('/dashboard/:id/tournament-management', {
                templateUrl: 'app/dashboard/tournament-management/tournament-management.tpl.html',
                controller: DashboardController,
                controllerAs: 'vm'
            })
            .when('/dashboard/:id/create-tournament', {
                templateUrl: 'app/dashboard/create-tournament/create-tournament.tpl.html',
                controller: CreateTournamentController,
                controllerAs: 'vm'
            })
            //same as create tournament but we will check if $routeParams are present, if so, we'll load data to be edited
            .when('/dashboard/:id/edit-tournament/:id', {
                templateUrl: 'app/dashboard/create-tournament/create-tournament.tpl.html',
                controller: CreateTournamentController,
                controllerAs: 'vm'
            })
            .when('/dashboard/:id/view-tournament/:id', {
                templateUrl: 'app/dashboard/view-tournament/view-tournament.tpl.html',
                controller: ViewTournamentController,
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/home' });
    });
}