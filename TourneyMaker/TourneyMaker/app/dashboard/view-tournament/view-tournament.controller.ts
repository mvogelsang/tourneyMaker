module TourneyMaker {
    export class ViewTournamentController {

        private isEditingScore: boolean = false;
        private score: number = 2;


        private matchups = [
            [
                { name: 'John', score: 2},
                { name: 'Matt', score: 4, winner: true }
            ],
            [
                { name: 'Kyle', score: 1 },
                { name: 'Travis', score: 7, winner:true }
            ],
            [
                { name: 'Joe', score: 5, winner: true },
                { name: 'Hyde', score: 4 }
            ],
        ];


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