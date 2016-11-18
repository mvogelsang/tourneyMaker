var TourneyMaker;
(function (TourneyMaker) {
    var UserService = (function () {
        function UserService($http) {
            this.$http = $http;
        }
        UserService.prototype.getUser = function () {
            return this.$http.get("Models/user.json");
        };
        UserService.$inject = ["$http"];
        return UserService;
    }());
    TourneyMaker.UserService = UserService;
    TourneyMaker.app.service("UserService", UserService);
})(TourneyMaker || (TourneyMaker = {}));
