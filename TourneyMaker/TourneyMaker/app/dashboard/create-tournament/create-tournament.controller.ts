﻿module TourneyMaker {

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

        private newName: string = "New Tournament";
        private publishing: boolean = false;
        private createdTournament: Tournament;
        private commaDlPartsArray;

        public static $inject = ["$scope", "$location", "AuthService", "BracketService", "$routeParams"];

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private authService: AuthService, private bracketService: BracketService, private $routeParams) {
            
        }

        private updateName(name): void {
            this.newName = name;
        }

        private error: boolean = false;

        private publishTournament(): void {
            this.publishing = true;
            this.host = this.authService.userLoggedIn;
            this.tournament.commaDlParts = this.commaDlPartsArray.toString();
            this.bracketService.publishTournament(this.host, this.tournament).then((data) => {

                this.publishing = false;
                this.createdTournament = data.data;
                if (this.createdTournament.tid != 0) {
                    this.$location.path("dashboard/view-tournament/" + this.createdTournament.tid);
                }
                else {
                    this.error = true;
                }
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