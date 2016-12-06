module TourneyMaker {

    export class CreateTournamentController {

        private host = {
            username: "",
            password: "",
            email: ""
        };


        private tournament = {
            tname: "",
            numParticipants: "",
            commaDlParts: ""
        };

        private publishing: boolean = false;
        private createdTournament: Tournament;
        private commaDlPartsArray;

        public static $inject = ["$scope", "$location", "AuthService", "BracketService", "$routeParams"];

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private authService: AuthService, private bracketService: BracketService, private $routeParams) {
            
        }

        private publishTournament(): void {
            this.publishing = true;
            this.host = this.authService.userLoggedIn;
            this.tournament.commaDlParts = this.commaDlPartsArray.toString();
            this.bracketService.publishTournament(this.host, this.tournament).then((data) => {

                this.publishing = false;
                this.createdTournament = data.data;

                this.$location.path("dashboard/" + this.$routeParams.id + "/view-tournament/" + this.createdTournament.tid);
                //navigate to view tournament 
            }).catch((error) => {
                //error
            });
        }

        private cancel(): void {
            this.$location.path('/dashboard/1/tournament-management');
        }
    }
    app.controller("CreateTournamentController", CreateTournamentController);
}