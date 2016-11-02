var TourneyMaker;
(function (TourneyMaker) {
    var ViewTournamentController = (function () {
        function ViewTournamentController($scope, $location, $uibModal, bracketService, $log) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$uibModal = $uibModal;
            this.bracketService = bracketService;
            this.$log = $log;
            this.isEditingScore = false;
            this.offset = 50;
            bracketService.getBracket().then(function (data) {
                _this.bracket = data.data;
            }).catch(function (error) {
                _this.$log.error("There was an error loading bracket");
                _this.$log.error(error);
            });
        }
        ViewTournamentController.prototype.openProfile = function (profile) {
            this.$uibModal.open({
                animation: true,
                templateUrl: 'app/public-profile/public-profile.tpl.html',
                controller: 'PublicProfileController',
                controllerAs: 'vm',
                //pass in all information we need to display a profile
                resolve: {
                    profile: function () { return profile; }
                }
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
        ViewTournamentController.$inject = ["$scope", "$location", "$uibModal", "BracketService", "$log"];
        return ViewTournamentController;
    }());
    TourneyMaker.ViewTournamentController = ViewTournamentController;
    TourneyMaker.app.controller("ViewTournamentController", ViewTournamentController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=view-tournament.controller.js.map