var TourneyMaker;
(function (TourneyMaker) {
    var ActiveTournamentsController = (function () {
        function ActiveTournamentsController($location) {
            this.$location = $location;
        }
        ActiveTournamentsController.prototype.viewTournament = function () {
            this.$location.path('/dashboard/1/view-tournament/1');
        };
        ActiveTournamentsController.$inject = ['$location'];
        return ActiveTournamentsController;
    }());
    TourneyMaker.ActiveTournamentsController = ActiveTournamentsController;
    TourneyMaker.app.controller('ActiveTournamentsController', ActiveTournamentsController);
})(TourneyMaker || (TourneyMaker = {}));
