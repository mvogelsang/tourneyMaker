var TourneyMaker;
(function (TourneyMaker) {
    var ViewTournamentController = (function () {
        function ViewTournamentController($scope, $location, $uibModal) {
            this.$scope = $scope;
            this.$location = $location;
            this.$uibModal = $uibModal;
            this.isEditingScore = false;
            this.score = 2;
            this.matchups = [
                [
                    { name: 'John', score: 2 },
                    { name: 'Matt', score: 4, winner: true }
                ],
                [
                    { name: 'Kyle', score: 1 },
                    { name: 'Travis', score: 7, winner: true }
                ],
                [
                    { name: 'Joe', score: 5, winner: true },
                    { name: 'Hyde', score: 4 }
                ],
            ];
        }
        ViewTournamentController.prototype.openProfile = function () {
            this.$uibModal.open({
                animation: true,
                templateUrl: 'app/public-profile/public-profile.tpl.html',
                controller: 'PublicProfileController',
                controllerAs: 'vm',
                //pass in all information we need to display a profile
                resolve: {}
            });
        };
        ViewTournamentController.prototype.close = function () {
            this.$location.path('/dashboard/1/active-tournaments');
        };
        ViewTournamentController.prototype.edit = function () {
            if (this.isEditingScore) {
                this.isEditingScore = false;
            }
            else {
                this.isEditingScore = true;
            }
        };
        ViewTournamentController.$inject = ["$scope", "$location", "$uibModal"];
        return ViewTournamentController;
    }());
    TourneyMaker.ViewTournamentController = ViewTournamentController;
    TourneyMaker.app.controller("ViewTournamentController", ViewTournamentController);
})(TourneyMaker || (TourneyMaker = {}));
