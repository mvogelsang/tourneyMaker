var TourneyMaker;
(function (TourneyMaker) {
    var BracketService = (function () {
        function BracketService($http) {
            this.$http = $http;
        }
        BracketService.prototype.publishTournament = function (host, tournament) {
            return this.$http.post("Tourney/NewTourney", { _data: host, _t: tournament });
        };
        BracketService.prototype.getBracket = function () {
            return this.$http.get("Models/bracket.json");
        };
        BracketService.prototype.getTournament = function (user, tourney) {
            return this.$http.post('Tourney/GetTourney', { _u: user, _t: tourney });
        };
        BracketService.prototype.updateMatchups = function (matchup, tourney) {
            return this.$http.post('Tourney/UpdateMatchup', { _m: matchup, _t: tourney });
        };
        BracketService.$inject = ["$http"];
        return BracketService;
    }());
    TourneyMaker.BracketService = BracketService;
    TourneyMaker.app.service("BracketService", BracketService);
})(TourneyMaker || (TourneyMaker = {}));
