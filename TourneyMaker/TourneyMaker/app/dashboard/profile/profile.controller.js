var TourneyMaker;
(function (TourneyMaker) {
    var ProfileController = (function () {
        function ProfileController($scope, userService, $log, $routeParams, authService) {
            //get user based of routeParams not like what is happening below
            //this.userService.getUser(this.user).then((data): any => {
            //    this.user = data.data;
            //}).catch((error): any => {
            //    this.$log.error("There was an error loading profile data.");
            //    this.$log.error(error);
            //    alert("There was an error loading profile data.");
            //});
            this.$scope = $scope;
            this.userService = userService;
            this.$log = $log;
            this.$routeParams = $routeParams;
            this.authService = authService;
            this.user = this.authService.userLoggedIn;
        }
        ProfileController.$inject = ["$scope", "UserService", "$log", "$routeParams", "AuthService"];
        return ProfileController;
    }());
    TourneyMaker.ProfileController = ProfileController;
    TourneyMaker.app.controller('ProfileController', ProfileController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=profile.controller.js.map