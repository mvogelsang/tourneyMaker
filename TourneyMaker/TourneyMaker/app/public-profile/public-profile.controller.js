var TourneyMaker;
(function (TourneyMaker) {
    var PublicProfileController = (function () {
        function PublicProfileController($uibModalInstance) {
            this.$uibModalInstance = $uibModalInstance;
        }
        PublicProfileController.prototype.close = function () {
            this.$uibModalInstance.dismiss('cancel');
        };
        PublicProfileController.$inject = ["$uibModalInstance"];
        return PublicProfileController;
    }());
    TourneyMaker.PublicProfileController = PublicProfileController;
    TourneyMaker.app.controller("PublicProfileController", PublicProfileController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=public-profile.controller.js.map