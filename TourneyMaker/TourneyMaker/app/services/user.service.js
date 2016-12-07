var TourneyMaker;
(function (TourneyMaker) {
    var UserService = (function () {
        function UserService($http) {
            this.$http = $http;
        }
        UserService.prototype.getAllTourneys = function (user) {
            return this.$http.post('User/GetAllTourneys', user);
        };
        UserService.prototype.getUserByUsername = function (user) {
            return this.$http.post("User/GetUser", user);
        };
        UserService.prototype.getUser = function (user) {
            return this.$http.post("User/LoginUser", user);
        };
        UserService.prototype.registerUser = function (user) {
            return this.$http.post("User/RegisterUser", user);
        };
        UserService.prototype.modifyUserProfile = function (user) {
            return this.$http.post("User/ModifyUserProfile", user);
        };
        UserService.$inject = ["$http"];
        return UserService;
    }());
    TourneyMaker.UserService = UserService;
    TourneyMaker.app.service("UserService", UserService);
})(TourneyMaker || (TourneyMaker = {}));
