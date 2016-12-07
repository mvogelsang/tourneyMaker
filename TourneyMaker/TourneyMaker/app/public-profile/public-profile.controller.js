var TourneyMaker;
(function (TourneyMaker) {
    var PublicProfileController = (function () {
        function PublicProfileController($uibModalInstance, profile, userService, bracketService) {
            var _this = this;
            this.$uibModalInstance = $uibModalInstance;
            this.profile = profile;
            this.userService = userService;
            this.bracketService = bracketService;
            this.userObj = {
                username: ""
            };
            this.user = {
                username: "",
                email: "",
                name: "",
                bio: ""
            };
            this.tournaments = new Array();
            this.userObj.username = profile;
            this.userService.getUserByUsername(this.userObj).then(function (data) {
                _this.user = data.data;
            });
            this.userService.getAllTourneys(this.userObj).then(function (data) {
                _this.tournaments = data.data;
            });
        }
        PublicProfileController.prototype.close = function () {
            this.$uibModalInstance.dismiss('cancel');
        };
        PublicProfileController.$inject = ["$uibModalInstance", "profile", "UserService", "BracketService"];
        return PublicProfileController;
    }());
    TourneyMaker.PublicProfileController = PublicProfileController;
    TourneyMaker.app.controller("PublicProfileController", PublicProfileController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=public-profile.controller.js.map