module TourneyMaker {

    export class CreateTournamentController {

        public static $inject = ["$scope"];

        constructor(private $scope: ng.IScope) {

        }
        foo(): void {
            //do something
        }
    }
    app.controller("CreateTournamentController", CreateTournamentController);
}