module TourneyMaker {
    export class ActiveTournamentsController {

        private tid;
        private user = {
            username: ""
        };
        private tournaments = new Array<Tournament>();

        public static $inject = ['$location', 'AuthService', "BracketService", "UserService", "$routeParams"];

        constructor(private $location: ng.ILocationService, private authService: AuthService, private bracketService: BracketService, private userService: UserService, private $routeParams) {
            this.user.username = this.$routeParams.id;
            this.userService.getAllTourneys(this.user).then((data): any => {
                this.tournaments = data.data;
            });
        }

        viewTournament(tid): void {
            this.$location.path('/dashboard/view-tournament/' + tid);
        }

    }

    app.controller('ActiveTournamentsController', ActiveTournamentsController);
}