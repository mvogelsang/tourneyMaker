module TourneyMaker {
    export class ProfileController {

        private user: User;

        public static $inject = ["$scope", "$log"];

        constructor(private $scope: ng.IScope, private $log: ng.ILogService) {
        }
    }

    app.controller('ProfileController', ProfileController);
}