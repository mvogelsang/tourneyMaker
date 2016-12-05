var TourneyMaker;
(function (TourneyMaker) {
    var ActiveTournamentsController = (function () {
        function ActiveTournamentsController($location, authService) {
            this.$location = $location;
            this.authService = authService;
            this.activeTournaments = new Array();
        }
        ActiveTournamentsController.prototype.viewTournament = function () {
            this.$location.path('/dashboard/' + this.authService.userLoggedIn.username + '/view-tournament/' + this.tid);
        };
        ActiveTournamentsController.$inject = ['$location', 'AuthService'];
        return ActiveTournamentsController;
    }());
    TourneyMaker.ActiveTournamentsController = ActiveTournamentsController;
    TourneyMaker.app.controller('ActiveTournamentsController', ActiveTournamentsController);
})(TourneyMaker || (TourneyMaker = {}));
