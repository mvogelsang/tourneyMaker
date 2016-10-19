module TourneyMaker {
    export class ActiveTournamentsController {

        public static $inject = ['$location'];

        constructor(private $location: ng.ILocationService) {

        }

        viewTournament(): void {
            this.$location.path('/dashboard/1/view-tournament/1');
        }

    }

    app.controller('ActiveTournamentsController', ActiveTournamentsController);
}