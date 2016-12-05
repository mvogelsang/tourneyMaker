module TourneyMaker {
    export class ActiveTournamentsController {

        private tid;
        private activeTournaments = new Array<Tournament>();

        public static $inject = ['$location', 'AuthService'];

        constructor(private $location: ng.ILocationService, private authService: AuthService) {

        }

        viewTournament(): void {
            this.$location.path('/dashboard/' + this.authService.userLoggedIn.username + '/view-tournament/' + this.tid);
        }

    }

    app.controller('ActiveTournamentsController', ActiveTournamentsController);
}