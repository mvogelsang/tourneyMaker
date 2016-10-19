module TourneyMaker {

    export class CreateTournamentController {

        public static $inject = ["$scope", "$location"];

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService) {

        }

        private cancel(): void {
            this.$location.path('/dashboard/1/tournament-management');
        }
    }
    app.controller("CreateTournamentController", CreateTournamentController);
}