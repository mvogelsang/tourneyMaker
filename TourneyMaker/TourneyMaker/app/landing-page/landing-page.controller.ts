module TourneyMaker {
    export class LandingPageController {

        //will be set 
        private isLoggedIn: boolean = false; 
        private usernameLogin: string;
        private passwordLogin: string; 

        private user = {
            username: "",
            password: "",
            email: ""
        };

        private registerError: boolean = false;


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
                //If user is logged in call GetUser to get the current user based on the cookie that is set
            }

        }

        login(username: string, password: string): void {

            this.user.username = this.usernameLogin;
            this.user.password = this.passwordLogin;

            this.authService.login(this.user).then((data) => {
                //this.user = data.data;
                this.isLoggedIn = true;
            }).catch((error) => {
                //error
            });

            //.then((data) => {
            //    this.user = data.data;
            //}).catch((error) => {
                //handle unsuccessful login
            //});

            //if (this.usernameLogin === this.user.username && this.passwordLogin === this.user.password) {
                //this.setActiveTourmaments();
                //this.isLoggedIn = true;
                //this.usernameLogin = "";
                //this.passwordLogin = "";

                //post to DB, get result (success/failure), if success set cookie with uid
                //this.$cookies.put("uid", this.user.uid);
                
                //this.isLoggedIn = true;


                //if (this.$cookies) {
                //    this.isLoggedIn = true;
                //}
            //}
            //else {
            //    this.usernameLogin = "";
            //    this.passwordLogin = "";
            //    return;
            //}
        }

        logout(): void {
            this.$cookies.remove('uid');
            this.isLoggedIn = false;
        }

        setActiveTourmaments(): void {
            this.$location.path('dashboard/' + this.authService.getUid() + '/active-tournaments');
            
        }

        setCompletedTourmaments(): void {
            this.$location.path('dashboard/' + this.authService.getUid() + '/completed-tournaments');
        }

        setProfile(): void {
            this.$location.path('dashboard/' + this.authService.getUid() + '/profile');
        }

        setTournamentManagement(): void {
            this.$location.path('dashboard/' + this.authService.getUid() + '/tournament-management');
        }

        setCreateTournament(): void {
            this.$location.path('dashboard/' + this.authService.getUid() + '/create-tournament');
        }

        private username: string;
        private email: string;
        private password: string;
        private rePassword: string;

        private validPassError: boolean = false;

        private createAccount(form, isLoggedIn): void {

            this.user.username = this.username;
            this.user.password = this.password;
            this.user.email = this.email;

            if (form.$valid) {
                //POST to database
                //GET userID and append to dashboard (/dashboard:{userId})

                this.userService.registerUser(this.user).then((data) => {
                    this.authService.login(this.user).then((data) => {
                        //login
                        this.isLoggedIn = true;
                    }).catch((error) => {

                    });
                }).catch((error) => {
                    this.registerError = true;
                });

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