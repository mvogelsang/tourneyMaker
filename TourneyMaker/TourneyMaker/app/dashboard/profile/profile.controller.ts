module TourneyMaker {
    export class ProfileController {

        private userLoggedIn: User;

        private user = {
            username: ""
        };

        public static $inject = ["$scope", "UserService", "$log", "$routeParams", "AuthService", "$route"];

        constructor(private $scope: ng.IScope, private userService: UserService, private $log: ng.ILogService, private $routeParams, private authService: AuthService, private $route) {
            //get user based of routeParams not like what is happening below
            //this.userService.getUser(this.user).then((data): any => {
            //    this.user = data.data;
            //}).catch((error): any => {
            //    this.$log.error("There was an error loading profile data.");
            //    this.$log.error(error);
            //    alert("There was an error loading profile data.");
            //});

            this.user.username = this.$routeParams.id;

            this.userService.getUserByUsername(this.user).then((data): any => {
                this.user = data.data;
            }).catch((error): any => {
                //error
            });
        }

        cancel(): void {
            this.$route.reload();
        }
    }

    app.controller('ProfileController', ProfileController);
}