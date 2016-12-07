var TourneyMaker;
(function (TourneyMaker) {
    var PublicProfileController = (function () {
        function PublicProfileController($uibModalInstance, profile) {
            this.$uibModalInstance = $uibModalInstance;
            this.profile = profile;
            this.profileObj = profile;
        }
        PublicProfileController.prototype.close = function () {
            this.$uibModalInstance.dismiss('cancel');
        };
        PublicProfileController.$inject = ["$uibModalInstance", "profile"];
        return PublicProfileController;
    })();
    TourneyMaker.PublicProfileController = PublicProfileController;
    TourneyMaker.app.controller("PublicProfileController", PublicProfileController);
})(TourneyMaker || (TourneyMaker = {}));
