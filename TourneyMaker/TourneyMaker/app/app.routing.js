var TourneyMaker;
(function (TourneyMaker) {
    TourneyMaker.app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {})
            .when('/dashboard/:id', {
            templateUrl: 'app/dashboard/dashboard.tpl.html',
            controller: TourneyMaker.DashboardController,
            controllerAs: 'vm'
        })
            .when('/dashboard/:id/active-tournaments', {
            templateUrl: 'app/dashboard/active-tournaments/active-tournaments.tpl.html',
            controller: TourneyMaker.ActiveTournamentsController,
            controllerAs: 'vm',
            resolve: {
                auth: ['$q', '$location', 'AuthService', '$cookies', function ($q, $location, AuthService, $cookies) {
                        var uid = AuthService.getUid();
                        if (uid) {
                            return $q.when(uid);
                        }
                        else {
                            $location.path('/');
                            return $q.reject({ authenticated: false });
                        }
                    }]
            }
        })
            .when('/dashboard/:id/completed-tournaments', {
            templateUrl: 'app/dashboard/completed-tournaments/completed-tournaments.tpl.html',
            controller: TourneyMaker.DashboardController,
            controllerAs: 'vm',
            resolve: {
                auth: ['$q', '$location', 'AuthService', function ($q, $location, AuthService) {
                        var uid = AuthService.getUid();
                        if (uid) {
                            return $q.when(uid);
                        }
                        else {
                            $location.path('/');
                            return $q.reject({ authenticated: false });
                        }
                    }]
            }
        })
            .when('/dashboard/:id/profile', {
            templateUrl: 'app/dashboard/profile/profile.tpl.html',
            controller: TourneyMaker.ProfileController,
            controllerAs: 'vm',
            resolve: {
                auth: ['$q', '$location', 'AuthService', function ($q, $location, AuthService) {
                        var uid = AuthService.getUid();
                        if (uid) {
                            return $q.when(uid);
                        }
                        else {
                            $location.path('/');
                            return $q.reject({ authenticated: false });
                        }
                    }]
            }
        })
            .when('/dashboard/:id/tournament-management', {
            templateUrl: 'app/dashboard/tournament-management/tournament-management.tpl.html',
            controller: TourneyMaker.DashboardController,
            controllerAs: 'vm',
            resolve: {
                auth: ['$q', '$location', 'AuthService', function ($q, $location, AuthService) {
                        var uid = AuthService.getUid();
                        if (uid) {
                            return $q.when(uid);
                        }
                        else {
                            $location.path('/');
                            return $q.reject({ authenticated: false });
                        }
                    }]
            }
        })
            .when('/dashboard/:id/create-tournament', {
            templateUrl: 'app/dashboard/create-tournament/create-tournament.tpl.html',
            controller: TourneyMaker.CreateTournamentController,
            controllerAs: 'vm',
            resolve: {
                auth: ['$q', '$location', 'AuthService', function ($q, $location, AuthService) {
                        var uid = AuthService.getUid();
                        if (uid) {
                            return $q.when(uid);
                        }
                        else {
                            $location.path('/');
                            return $q.reject({ authenticated: false });
                        }
                    }]
            }
        })
            .when('/dashboard/:id/edit-tournament/:id', {
            templateUrl: 'app/dashboard/create-tournament/create-tournament.tpl.html',
            controller: TourneyMaker.CreateTournamentController,
            controllerAs: 'vm',
            resolve: {
                auth: ['$q', '$location', 'AuthService', function ($q, $location, AuthService) {
                        var uid = AuthService.getUid();
                        if (uid) {
                            return $q.when(uid);
                        }
                        else {
                            $location.path('/');
                            return $q.reject({ authenticated: false });
                        }
                    }]
            }
        })
            .when('/dashboard/view-tournament/:id', {
            templateUrl: 'app/dashboard/view-tournament/view-tournament.tpl.html',
            controller: TourneyMaker.ViewTournamentController,
            controllerAs: 'vm',
            resolve: {
                auth: ['$q', '$location', 'AuthService', function ($q, $location, AuthService) {
                        var uid = AuthService.getUid();
                        if (uid) {
                            return $q.when(uid);
                        }
                        else {
                            $location.path('/');
                            return $q.reject({ authenticated: false });
                        }
                    }]
            }
        })
            .otherwise({ redirectTo: '/' });
    });
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=app.routing.js.map