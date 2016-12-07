module TourneyMaker {
    export class BracketService {

        public static $inject = ["$http"];

        constructor(private $http: ng.IHttpService) {

        }

        publishTournament(host, tournament: any): ng.IPromise<any> {
            return this.$http.post("Tourney/NewTourney", {_data: host, _t: tournament});
        }

        getBracket(): ng.IPromise<any> {
            return this.$http.get("Models/bracket.json");
        }

        getTournament(user, tourney): ng.IPromise<any> {
            return this.$http.post('Tourney/GetTourney', {_data: user, _t: tourney});
        }

        updateMatchups(matchup, tourney): ng.IPromise<any> {
            return this.$http.post('Tourney/UpdateMatchup', {match: matchup, _t: tourney})
        }
    }

    app.service("BracketService", BracketService);
}