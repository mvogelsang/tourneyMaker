module TourneyMaker {
    export class ViewTournamentController {

        public static $inject = ["$scope", "$location", "$uibModal"];

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private $uibModal) {

        }

        private openProfile(): void {
            this.$uibModal.open({
                animation: true,
                templateUrl: 'app/public-profile/public-profile.tpl.html',
                controller: 'PublicProfileController',
                controllerAs: 'vm',
                //pass in all information we need to display a profile
                resolve: {}
            });
        }

        private close(): void {
            this.$location.path('/dashboard/1/active-tournaments');
        }

    }

    app.controller("ViewTournamentController", ViewTournamentController);
}