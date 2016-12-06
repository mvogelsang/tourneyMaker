var TourneyMaker;
(function (TourneyMaker) {
    var CreateTournamentController = (function () {
        function CreateTournamentController($scope, $location, authService, bracketService, $routeParams) {
            this.$scope = $scope;
            this.$location = $location;
            this.authService = authService;
            this.bracketService = bracketService;
            this.$routeParams = $routeParams;
            this.host = {
                username: "",
                password: "",
                email: ""
            };
            this.tournament = {
                tname: "",
                numParticipants: "",
                commaDlParts: ""
            };
            this.publishing = false;
        }
        CreateTournamentController.prototype.publishTournament = function () {
            var _this = this;
            this.publishing = true;
            this.host = this.authService.userLoggedIn;
            this.tournament.commaDlParts = this.commaDlPartsArray.toString();
            this.bracketService.publishTournament(this.host, this.tournament).then(function (data) {
                _this.publishing = false;
                _this.tid = data.data.tid;
                _this.$location.path("dashboard/" + _this.$routeParams.id + "view-tournament" + _this.tid);
                //navigate to view tournament 
            }).catch(function (error) {
                //error
            });
        };
        CreateTournamentController.prototype.cancel = function () {
            this.$location.path('/dashboard/1/tournament-management');
        };
        CreateTournamentController.$inject = ["$scope", "$location", "AuthService", "BracketService", "$routeParams"];
        return CreateTournamentController;
    }());
    TourneyMaker.CreateTournamentController = CreateTournamentController;
    TourneyMaker.app.controller("CreateTournamentController", CreateTournamentController);
})(TourneyMaker || (TourneyMaker = {}));
