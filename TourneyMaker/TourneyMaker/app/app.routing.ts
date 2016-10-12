module TourneyMaker {
    app.config(function ($routeProvider) {
        $routeProvider
            //the template and controlller will be loaded based on what is in the URL (ie: the argument in 'when')
            .when('/home', {
                templateUrl: 'app/home/home.tpl.html',
                controller: HomeController,
                controllerAs: 'vm'
            })
            //this will use :{id} to denote a specific users dashboard when we start getting data and shit
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.tpl.html',
                controller: DashboardController,
                controllerAs: 'vm'
            })
            .when('/create-tournament', {
                templateUrl: 'app/create-tournament/create-tournament.tpl.html',
                controller: CreateTournamentController,
                controllerAs: 'vm'
            })
            .when('/edit-tournament:{id}', {
                templateUrl: 'app/create-tournament/create-tournament.tpl.html',
                controller: CreateTournamentController,
                controllerAs: 'vm'
            })
            //again, this will use :{id}
            .when('/view-tournament', {
                templateUrl: 'app/view-tournament/view-tournament.tpl.html',
                controller: ViewTournamentController,
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/home' });
    });
}