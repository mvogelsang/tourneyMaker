var TourneyMaker;
(function (TourneyMaker) {
    var LandingPageController = (function () {
        function LandingPageController($scope, $location, userService, $log, $cookies, authService) {
            //if (this.$location.absUrl() == "http://localhost:58494/#/") {
            //    this.isLoggedIn = false;
            //}
            //else {
            //    this.isLoggedIn = true;
            //}
            this.$scope = $scope;
            this.$location = $location;
            this.userService = userService;
            this.$log = $log;
            this.$cookies = $cookies;
            this.authService = authService;
            //will be set 
            this.isLoggedIn = false;
            this.user = {
                username: "",
                password: "",
                email: ""
            };
            this.validPassError = false;
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
        }
        LandingPageController.prototype.login = function (username, password) {
            this.user.username = this.usernameLogin;
            this.user.password = this.passwordLogin;
            this.authService.login(this.user);
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
        };
        LandingPageController.prototype.logout = function () {
            this.$cookies.remove('uid');
            this.isLoggedIn = false;
        };
        LandingPageController.prototype.setActiveTourmaments = function () {
            this.$location.path('dashboard/' + this.authService.getUid() + '/active-tournaments');
        };
        LandingPageController.prototype.setCompletedTourmaments = function () {
            this.$location.path('dashboard/' + this.authService.getUid() + '/completed-tournaments');
        };
        LandingPageController.prototype.setProfile = function () {
            this.$location.path('dashboard/' + this.authService.getUid() + '/profile');
        };
        LandingPageController.prototype.setTournamentManagement = function () {
            this.$location.path('dashboard/' + this.authService.getUid() + '/tournament-management');
        };
        LandingPageController.prototype.setCreateTournament = function () {
            this.$location.path('dashboard/' + this.authService.getUid() + '/create-tournament');
        };
        LandingPageController.prototype.createAccount = function (form, isLoggedIn) {
            var _this = this;
            this.user.username = this.username;
            this.user.password = this.password;
            this.user.email = this.email;
            if (form.$valid) {
                //POST to database
                //GET userID and append to dashboard (/dashboard:{userId})
                this.userService.registerUser(this.user).then(function (data) {
                    _this.authService.login(_this.user).then(function (data) {
                        //login
                    }).catch(function (error) {
                    });
                }).catch(function (error) {
                });
            }
            else {
                form.username.$setDirty();
                form.email.$setDirty();
                form.password.$setDirty();
                return;
            }
        };
        //change to validate all inputs
        LandingPageController.prototype.validatePassword = function (form) {
            if (this.password === this.rePassword) {
                this.validPassError = false;
                return true;
            }
            else {
                this.validPassError = true;
                form.$valid = false;
                return false;
            }
        };
        LandingPageController.$inject = ["$scope", "$location", "UserService", "$log", "$cookies", "AuthService"];
        return LandingPageController;
    }());
    TourneyMaker.LandingPageController = LandingPageController;
    TourneyMaker.app.controller("LandingPageController", LandingPageController);
})(TourneyMaker || (TourneyMaker = {}));
