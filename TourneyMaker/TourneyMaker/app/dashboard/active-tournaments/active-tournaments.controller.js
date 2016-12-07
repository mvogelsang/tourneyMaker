var TourneyMaker;
(function (TourneyMaker) {
    var ActiveTournamentsController = (function () {
        function ActiveTournamentsController($location, authService, bracketService, userService, $routeParams) {
            var _this = this;
            this.$location = $location;
            this.authService = authService;
            this.bracketService = bracketService;
            this.userService = userService;
            this.$routeParams = $routeParams;
            this.user = {
                username: ""
            };
            this.tournaments = new Array();
            this.waiting = false;
            this.user.username = this.$routeParams.id;
            this.waiting = true;
            this.userService.getAllTourneys(this.user).then(function (data) {
                _this.waiting = false;
                _this.tournaments = data.data;
            });
        }
        ActiveTournamentsController.prototype.viewTournament = function (tid) {
            this.$location.path('/dashboard/view-tournament/' + tid);
        };
        ActiveTournamentsController.$inject = ['$location', 'AuthService', "BracketService", "UserService", "$routeParams"];
        return ActiveTournamentsController;
    })();
    TourneyMaker.ActiveTournamentsController = ActiveTournamentsController;
    TourneyMaker.app.controller('ActiveTournamentsController', ActiveTournamentsController);
})(TourneyMaker || (TourneyMaker = {}));
