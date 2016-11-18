module TourneyMaker {
    export class TournamentManagementController {

        public static $inject = ["$location"];

        constructor(private $location: ng.ILocationService) {

        }
    }

    app.controller("TournamentManagementController", TournamentManagementController);
}