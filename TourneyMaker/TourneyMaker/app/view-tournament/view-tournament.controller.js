var TourneyMaker;
(function (TourneyMaker) {
    var ViewTournamentController = (function () {
        function ViewTournamentController($scope, $location, $uibModal) {
            this.$scope = $scope;
            this.$location = $location;
            this.$uibModal = $uibModal;
        }
        ViewTournamentController.prototype.openProfile = function () {
            this.$uibModal.open({
                animation: true,
                templateUrl: 'app/public-profile/public-profile.tpl.html',
                controller: 'PublicProfileController',
                controllerAs: 'vm',
                //pass in all information we need to display a profile
                resolve: {}
            });
        };
        ViewTournamentController.$inject = ["$scope", "$location", "$uibModal"];
        return ViewTournamentController;
    }());
    TourneyMaker.ViewTournamentController = ViewTournamentController;
    TourneyMaker.app.controller("ViewTournamentController", ViewTournamentController);
})(TourneyMaker || (TourneyMaker = {}));
