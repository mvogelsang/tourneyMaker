var TourneyMaker;
(function (TourneyMaker) {
    var AddManagerController = (function () {
        function AddManagerController($uibModalInstance, bracketService, $routeParams) {
            this.$uibModalInstance = $uibModalInstance;
            this.bracketService = bracketService;
            this.$routeParams = $routeParams;
            this.manager = {
                email: ""
            };
            this.tourney = {
                tid: 0
            };
            this.tourney.tid = this.$routeParams.id;
        }
        AddManagerController.prototype.add = function () {
            this.bracketService.addManager(this.manager, this.tourney).then(function (data) {
            });
        };
        AddManagerController.prototype.close = function () {
            this.$uibModalInstance.dismiss('cancel');
        };
        AddManagerController.$injext = ["uibModalInstance", "BracketService", "$routeParams"];
        return AddManagerController;
    }());
    TourneyMaker.AddManagerController = AddManagerController;
    TourneyMaker.app.controller('AddManagerController', AddManagerController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=add-manager.controller.js.map