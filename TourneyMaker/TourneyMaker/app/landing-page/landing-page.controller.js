var TourneyMaker;
(function (TourneyMaker) {
    var LandingPageController = (function () {
        function LandingPageController($scope, $location) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            //will be set 
            this.isLoggedIn = false;
            this.validPassError = false;
            if (this.$location.absUrl() == "http://localhost:58494/#/home") {
                this.isLoggedIn = false;
            }
            else {
                this.isLoggedIn = true;
            }
            $scope.$watch(function () {
                return _this.$location.absUrl();
            }, function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if (newValue == "http://localhost:58494/#/home") {
                        _this.isLoggedIn = false;
                    }
                    else {
                        _this.isLoggedIn = true;
                    }
                }
            });
        }
        //the 1 will be replaced by the users id
        LandingPageController.prototype.setActiveTourmaments = function () {
            this.$location.path('dashboard/1/active-tournaments');
        };
        LandingPageController.prototype.setCompletedTourmaments = function () {
            this.$location.path('dashboard/1/completed-tournaments');
        };
        LandingPageController.prototype.setProfile = function () {
            this.$location.path('dashboard/1/profile');
        };
        LandingPageController.prototype.setTournamentManagement = function () {
            this.$location.path('dashboard/1/tournament-management');
        };
        LandingPageController.prototype.createAccount = function (form, isLoggedIn) {
            if (form.$valid) {
                //POST to database
                //GET userID and append to dashboard (/dashboard:{userId})
                this.$location.path('/dashboard/1/active-tournaments');
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
        LandingPageController.$inject = ["$scope", "$location"];
        return LandingPageController;
    }());
    TourneyMaker.LandingPageController = LandingPageController;
    TourneyMaker.app.controller("LandingPageController", LandingPageController);
})(TourneyMaker || (TourneyMaker = {}));
