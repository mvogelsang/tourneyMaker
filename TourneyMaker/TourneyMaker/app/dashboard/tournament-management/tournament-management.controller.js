var TourneyMaker;
(function (TourneyMaker) {
    var TournamentManagementController = (function () {
        function TournamentManagementController($location) {
            this.$location = $location;
        }
        TournamentManagementController.$inject = ["$location"];
        return TournamentManagementController;
    })();
    TourneyMaker.TournamentManagementController = TournamentManagementController;
    TourneyMaker.app.controller("TournamentManagementController", TournamentManagementController);
})(TourneyMaker || (TourneyMaker = {}));
