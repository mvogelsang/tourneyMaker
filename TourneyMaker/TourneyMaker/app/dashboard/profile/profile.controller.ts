module TourneyMaker {
    export class ProfileController {

        private user: User;

        public static $inject = ["$scope", "UserService", "$log", "$routeParams", "AuthService"];

        constructor(private $scope: ng.IScope, private userService: UserService, private $log: ng.ILogService, private $routeParams, private authService: AuthService) {
            //get user based of routeParams not like what is happening below
            //this.userService.getUser(this.user).then((data): any => {
            //    this.user = data.data;
            //}).catch((error): any => {
            //    this.$log.error("There was an error loading profile data.");
            //    this.$log.error(error);
            //    alert("There was an error loading profile data.");
            //});

            this.user = this.authService.userLoggedIn;
        }
    }

    app.controller('ProfileController', ProfileController);
}