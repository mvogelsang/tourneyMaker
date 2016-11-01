module TourneyMaker {
    export class LandingPageController {

        //will be set 
        private isLoggedIn: boolean = false; 
        private usernameLogin: string;
        private passwordLogin: string; 

        private user: User;


        public static $inject = ["$scope", "$location", "UserService", "$log", "$cookies", "AuthService"]

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private userService: UserService, private $log: ng.ILogService, private $cookies, private authService: AuthService) {

            //if (this.$location.absUrl() == "http://localhost:58494/#/") {
            //    this.isLoggedIn = false;
            //}
            //else {
            //    this.isLoggedIn = true;
            //}

            //$scope.$watch(() => {
            //    return this.$cookies;
            //}, (newValue, oldValue) => {
            //    if (newValue != oldValue) {
            //        if (this.$cookies) {
            //            this.isLoggedIn = false;
            //        }
            //    }
            //});

            if (authService.getUid()) {
                this.isLoggedIn = true;
            }



            this.userService.getUser().then((data): any => {
                this.user = data.data;
            }).catch((error): any => {
                this.$log.error("There was an error loading profile data.");
                this.$log.error(error);
                alert("There was an error loading profile data.");
                });

        }

        login(username: string, password: string): void {
            if (this.usernameLogin === this.user.username && this.passwordLogin === this.user.password) {
                this.setActiveTourmaments();
                //this.isLoggedIn = true;
                this.usernameLogin = "";
                this.passwordLogin = "";

                //post to DB, get result (success/failure), if success set cookie with uid
                this.$cookies.put("uid", this.user.uid);
                this.isLoggedIn = true;


                //if (this.$cookies) {
                //    this.isLoggedIn = true;
                //}
            }
            else {
                this.usernameLogin = "";
                this.passwordLogin = "";
                return;
            }
        }

        logout(): void {
            this.$cookies.remove('uid');
            this.isLoggedIn = false;
        }

        //the 1 will be replaced by the users id
        setActiveTourmaments(): void {
            this.$location.path('dashboard/' + this.user.uid + '/active-tournaments');
            
        }

        setCompletedTourmaments(): void {
            this.$location.path('dashboard/' + this.user.uid + '/completed-tournaments');
        }

        setProfile(): void {
            this.$location.path('dashboard/' + this.user.uid + '/profile');
        }

        setTournamentManagement(): void {
            this.$location.path('dashboard/' + this.user.uid + '/tournament-management');
        }

        private username: string;
        private email: string;
        private password: string;
        private rePassword: string;

        private validPassError: boolean = false;

        private createAccount(form, isLoggedIn): void {
            if (form.$valid) {
                //POST to database
                //GET userID and append to dashboard (/dashboard:{userId})
                this.$location.path('/dashboard/' + this.user.uid + '/active-tournaments');
            }
            else {
                form.username.$setDirty();
                form.email.$setDirty();
                form.password.$setDirty();

                return;
            }


        }

        //change to validate all inputs
        private validatePassword(form: ng.IFormController): boolean {
            if (this.password === this.rePassword) {
                this.validPassError = false;
                return true;
            }
            else {
                this.validPassError = true;
                form.$valid = false;
                return false;
            }
        }


    }


    app.controller("LandingPageController", LandingPageController);
}