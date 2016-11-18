var TourneyMaker;
(function (TourneyMaker) {
    var ProfileController = (function () {
        function ProfileController($scope, userService, $log, $routeParams) {
            var _this = this;
            this.$scope = $scope;
            this.userService = userService;
            this.$log = $log;
            this.$routeParams = $routeParams;
            //get user based of routeParams not like what is happening below
            this.userService.getUser().then(function (data) {
                _this.user = data.data;
            }).catch(function (error) {
                _this.$log.error("There was an error loading profile data.");
                _this.$log.error(error);
                alert("There was an error loading profile data.");
            });
        }
        ProfileController.$inject = ["$scope", "UserService", "$log", "$routeParams"];
        return ProfileController;
    }());
    TourneyMaker.ProfileController = ProfileController;
    TourneyMaker.app.controller('ProfileController', ProfileController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=profile.controller.js.map