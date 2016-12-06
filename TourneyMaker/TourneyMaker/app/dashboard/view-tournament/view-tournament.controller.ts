module TourneyMaker {
    export class ViewTournamentController {

        private isEditingScore: boolean = false;

        private offset: number = 50;

        private bracket;

        private tourney = {
            tid: 0
        }

        private tournament: Tournament;


        public static $inject = ["$scope", "$location", "$uibModal", "BracketService", "$log", "AuthService", "$routeParams"];

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private $uibModal, private bracketService: BracketService, private $log: ng.ILogService, private authService: AuthService, private $routeParams) {
            //bracketService.getBracket().then((data): any => {
            //    this.bracket = data.data;
            //}).catch((error): any => {
            //    this.$log.error("There was an error loading bracket");
            //    this.$log.error(error);
            //    });
            this.tourney.tid = this.$routeParams.id;

            this.bracketService.getTournament(this.tourney).then((data): any => {
                this.tournament = data.data;
                this.bracket = this.tournament.rounds;
            });


        }

        private openProfile(profile): void {
            this.$uibModal.open({
                animation: true,
                templateUrl: 'app/public-profile/public-profile.tpl.html',
                controller: 'PublicProfileController',
                controllerAs: 'vm',
                //pass in all information we need to display a profile
                resolve: {
                    profile: () => profile
                }
            });
        }

        private close(): void {
            this.$location.path('/dashboard/' + this.authService.userLoggedIn.username + '/active-tournaments');
        }

        private edit(): void {
            if (this.isEditingScore) {
                this.isEditingScore = false;
            }
            else {
                this.isEditingScore = true;
            }
        }


    }

    app.controller("ViewTournamentController", ViewTournamentController);
}