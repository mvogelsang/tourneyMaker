module TourneyMaker {
    export class BracketService {

        public static $inject = ["$http"];

        constructor(private $http: ng.IHttpService) {

        }

        getBracket(): ng.IPromise<any> {
            return this.$http.get("Models/bracket.json");
        }
    }

    app.service("BracketService", BracketService);
}