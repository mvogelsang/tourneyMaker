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
        BracketService.$inject = ["$http"];
        return BracketService;
    }());
    TourneyMaker.BracketService = BracketService;
    TourneyMaker.app.service("BracketService", BracketService);
})(TourneyMaker || (TourneyMaker = {}));
