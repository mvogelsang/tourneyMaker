module TourneyMaker {

    export class CreateTournamentController {

        public static $inject = ["$scope", "$location"];

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService) {

        }

        private cancel(): void {
            this.$location.path('/dashboard');
        }
    }
    app.controller("CreateTournamentController", CreateTournamentController);
}