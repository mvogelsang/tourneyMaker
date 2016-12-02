module TourneyMaker {
    export class UserService {

        public static $inject = ["$http"];

        constructor(private $http: ng.IHttpService) {

        }

        getUser(user): ng.IPromise<any> {
            return this.$http.post("User/LoginUser", user);
        }

        registerUser(user): ng.IPromise<any> {
            return this.$http.post("User/RegisterUser", user);
        }
    }

    app.service("UserService", UserService);
}