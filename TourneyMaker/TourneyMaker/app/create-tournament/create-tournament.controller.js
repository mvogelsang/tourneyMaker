var TourneyMaker;
(function (TourneyMaker) {
    var CreateTournamentController = (function () {
        function CreateTournamentController($scope) {
            this.$scope = $scope;
        }
        CreateTournamentController.prototype.foo = function () {
            //do something
        };
        CreateTournamentController.$inject = ["$scope"];
        return CreateTournamentController;
    }());
    TourneyMaker.CreateTournamentController = CreateTournamentController;
    TourneyMaker.app.controller("CreateTournamentController", CreateTournamentController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=create-tournament.controller.js.map