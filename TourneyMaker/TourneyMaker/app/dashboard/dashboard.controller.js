var TourneyMaker;
(function (TourneyMaker) {
    var DashboardController = (function () {
        function DashboardController($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            this.isActiveTournaments = true;
            this.isCompletedTournaments = false;
            this.isProfile = false;
            this.isTournamentManagement = false;
            this.isActiveTournaments = true;
        }
        //dashboard navigation
        DashboardController.prototype.setActiveTournaments = function () {
            this.$location.path('/dashboard/1/active-tournaments');
        };
        DashboardController.prototype.setCompletedTournaments = function () {
            this.isActiveTournaments = false;
            this.isCompletedTournaments = true;
            this.isProfile = false;
            this.isTournamentManagement = false;
        };
        DashboardController.prototype.setProfile = function () {
            this.isActiveTournaments = false;
            this.isCompletedTournaments = false;
            this.isProfile = true;
            this.isTournamentManagement = false;
        };
        DashboardController.prototype.setTournamentManagement = function () {
            this.isActiveTournaments = false;
            this.isCompletedTournaments = false;
            this.isProfile = false;
            this.isTournamentManagement = true;
        };
        DashboardController.prototype.viewTournament = function () {
            this.$location.path("/view-tournament");
        };
        DashboardController.$inject = ["$scope", "$location"];
        return DashboardController;
    }());
    TourneyMaker.DashboardController = DashboardController;
    TourneyMaker.app.controller("DashboardController", DashboardController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=dashboard.controller.js.map