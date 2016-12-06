var TourneyMaker;
(function (TourneyMaker) {
    var ViewTournamentController = (function () {
        function ViewTournamentController($scope, $location, $uibModal, bracketService, $log, authService, $routeParams) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$uibModal = $uibModal;
            this.bracketService = bracketService;
            this.$log = $log;
            this.authService = authService;
            this.$routeParams = $routeParams;
            this.isEditingScore = false;
            this.offset = 50;
            this.top = new Array();
            this.bottom = new Array();
            this.tourney = {
                tid: 0
            };
            //bracketService.getBracket().then((data): any => {
            //    this.bracket = data.data;
            //}).catch((error): any => {
            //    this.$log.error("There was an error loading bracket");
            //    this.$log.error(error);
            //    });
            this.tourney.tid = this.$routeParams.id;
            this.bracketService.getTournament(this.tourney).then(function (data) {
                _this.tournament = data.data;
                _this.bracket = _this.tournament.rounds;
                _this.sort();
            });
        }
        ViewTournamentController.prototype.updateScores = function (mid, s1, s2, tid) {
            var matchup = {
                matchid: mid,
                score1: s1,
                score2: s2,
            };
            var tournament = {
                tournamentid: tid,
            };
            this.bracketService.updateMatchups(matchup, tournament).then(function (data) {
            });
        };
        ViewTournamentController.prototype.sort = function () {
            for (var i = 0; i < this.bracket.length; i++) {
                this.bracket[i].isEditing = false;
                if (i % 2 == 0) {
                    this.top.push(this.bracket[i]);
                }
                else {
                    this.bottom.push(this.bracket[i]);
                }
            }
        };
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
            this.$location.path('/dashboard/' + this.authService.userLoggedIn.username + '/active-tournaments');
        };
        ViewTournamentController.prototype.edit = function () {
            if (this.isEditingScore) {
                this.isEditingScore = false;
            }
            else {
                this.isEditingScore = true;
            }
        };
        ViewTournamentController.$inject = ["$scope", "$location", "$uibModal", "BracketService", "$log", "AuthService", "$routeParams"];
        return ViewTournamentController;
    }());
    TourneyMaker.ViewTournamentController = ViewTournamentController;
    TourneyMaker.app.controller("ViewTournamentController", ViewTournamentController);
})(TourneyMaker || (TourneyMaker = {}));
