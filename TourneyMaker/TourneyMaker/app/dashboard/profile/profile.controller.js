var TourneyMaker;
(function (TourneyMaker) {
    var ProfileController = (function () {
        function ProfileController($scope, $log) {
            this.$scope = $scope;
            this.$log = $log;
        }
        ProfileController.$inject = ["$scope", "$log"];
        return ProfileController;
    }());
    TourneyMaker.ProfileController = ProfileController;
    TourneyMaker.app.controller('ProfileController', ProfileController);
})(TourneyMaker || (TourneyMaker = {}));
