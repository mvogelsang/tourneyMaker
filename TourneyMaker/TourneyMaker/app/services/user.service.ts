module TourneyMaker {
    export class UserService {

        public static $inject = ["$http"];

        constructor(private $http: ng.IHttpService) {

        }

        getUser(): ng.IPromise<any> {
            return this.$http.get("Models/user.json");
        }
    }

    app.service("UserService", UserService);
}