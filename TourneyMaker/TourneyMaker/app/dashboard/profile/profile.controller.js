var TourneyMaker;
(function (TourneyMaker) {
    var ProfileController = (function () {
        function ProfileController($scope, userService, $log, $routeParams, authService, $route) {
            //get user based of routeParams not like what is happening below
            //this.userService.getUser(this.user).then((data): any => {
            //    this.user = data.data;
            //}).catch((error): any => {
            //    this.$log.error("There was an error loading profile data.");
            //    this.$log.error(error);
            //    alert("There was an error loading profile data.");
            //});
            var _this = this;
            this.$scope = $scope;
            this.userService = userService;
            this.$log = $log;
            this.$routeParams = $routeParams;
            this.authService = authService;
            this.$route = $route;
            this.user = {
                username: "",
                email: "",
                name: "",
                bio: ""
            };
            this.user.username = this.$routeParams.id;
            this.userService.getUserByUsername(this.user).then(function (data) {
                _this.user = data.data;
            }).catch(function (error) {
                //error
            });
        }
        ProfileController.prototype.save = function () {
            var _this = this;
            this.userService.modifyUserProfile(this.user).then(function (data) {
                _this.user = data.data;
            });
        };
        ProfileController.prototype.cancel = function () {
            this.$route.reload();
        };
        ProfileController.$inject = ["$scope", "UserService", "$log", "$routeParams", "AuthService", "$route"];
        return ProfileController;
    }());
    TourneyMaker.ProfileController = ProfileController;
    TourneyMaker.app.controller('ProfileController', ProfileController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=profile.controller.js.map