var TourneyMaker;
(function (TourneyMaker) {
    var CreateTournamentController = (function () {
        function CreateTournamentController($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
        }
        CreateTournamentController.prototype.cancel = function () {
            this.$location.path('/dashboard/1/tournament-management');
        };
        CreateTournamentController.$inject = ["$scope", "$location"];
        return CreateTournamentController;
    }());
    TourneyMaker.CreateTournamentController = CreateTournamentController;
    TourneyMaker.app.controller("CreateTournamentController", CreateTournamentController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=create-tournament.controller.js.map