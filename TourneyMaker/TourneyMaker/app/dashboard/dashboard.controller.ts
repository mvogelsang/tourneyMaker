module TourneyMaker {
    export class DashboardController {

        private isActiveTournaments: boolean = true;
        private isCompletedTournaments: boolean = false;
        private isProfile: boolean = false;
        private isTournamentManagement: boolean = false;


        public static $inject = ["$scope", "$location"];

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService) {
            this.isActiveTournaments = true;
        }

        //dashboard navigation
        private setActiveTournaments(): void {
            this.$location.path('/dashboard/1/active-tournaments');
        }

        private setCompletedTournaments(): void {
            this.isActiveTournaments = false;
            this.isCompletedTournaments = true;
            this.isProfile = false;
            this.isTournamentManagement = false;
        }

        private setProfile(): void {
            this.isActiveTournaments = false;
            this.isCompletedTournaments = false;
            this.isProfile = true;
            this.isTournamentManagement = false;
        }

        private setTournamentManagement(): void {
            this.isActiveTournaments = false;
            this.isCompletedTournaments = false;
            this.isProfile = false;
            this.isTournamentManagement = true;
        }

        private viewTournament(): void {
            this.$location.path("/view-tournament");
        }



    }

    app.controller("DashboardController", DashboardController);
}