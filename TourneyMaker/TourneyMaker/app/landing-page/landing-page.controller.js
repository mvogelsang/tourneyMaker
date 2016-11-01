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
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.userService = userService;
            this.$log = $log;
            this.$cookies = $cookies;
            this.authService = authService;
            //will be set 
            this.isLoggedIn = false;
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
            this.userService.getUser().then(function (data) {
                _this.user = data.data;
            }).catch(function (error) {
                _this.$log.error("There was an error loading profile data.");
                _this.$log.error(error);
                alert("There was an error loading profile data.");
            });
        }
        LandingPageController.prototype.login = function (username, password) {
            if (this.usernameLogin === this.user.username && this.passwordLogin === this.user.password) {
                this.setActiveTourmaments();
                //this.isLoggedIn = true;
                this.usernameLogin = "";
                this.passwordLogin = "";
                //post to DB, get result (success/failure), if success set cookie with uid
                this.$cookies.put("uid", this.user.uid);
                this.isLoggedIn = true;
            }
            else {
                this.usernameLogin = "";
                this.passwordLogin = "";
                return;
            }
        };
        LandingPageController.prototype.logout = function () {
            this.$cookies.remove('uid');
            this.isLoggedIn = false;
        };
        //the 1 will be replaced by the users id
        LandingPageController.prototype.setActiveTourmaments = function () {
            this.$location.path('dashboard/' + this.user.uid + '/active-tournaments');
        };
        LandingPageController.prototype.setCompletedTourmaments = function () {
            this.$location.path('dashboard/' + this.user.uid + '/completed-tournaments');
        };
        LandingPageController.prototype.setProfile = function () {
            this.$location.path('dashboard/' + this.user.uid + '/profile');
        };
        LandingPageController.prototype.setTournamentManagement = function () {
            this.$location.path('dashboard/' + this.user.uid + '/tournament-management');
        };
        LandingPageController.prototype.createAccount = function (form, isLoggedIn) {
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
