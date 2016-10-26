module TourneyMaker {
    export class ViewTournamentController {

        private isEditingScore: boolean = false;

        private offset: number = 50;

        private bracket;


        public static $inject = ["$scope", "$location", "$uibModal", "BracketService", "$log"];

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private $uibModal, private bracketService: BracketService, private $log: ng.ILogService) {
            bracketService.getBracket().then((data): any => {
                this.bracket = data.data;
            }).catch((error): any => {
                this.$log.error("There was an error loading bracket");
                this.$log.error(error);
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
            this.$location.path('/dashboard/1/active-tournaments');
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