var TourneyMaker;
(function (TourneyMaker) {
    var LandingPageController = (function () {
        function LandingPageController($location) {
            this.$location = $location;
            //will be set 
            this.isLoggedIn = false;
            if (this.$location.path() == "/home" || this.$location.path() == "http://localhost:58494/") {
                this.isLoggedIn = false;
            }
            else {
                this.isLoggedIn = true;
            }
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
        LandingPageController.$inject = ["$location"];
        return LandingPageController;
    }());
    TourneyMaker.LandingPageController = LandingPageController;
    TourneyMaker.app.controller("LandingPageController", LandingPageController);
})(TourneyMaker || (TourneyMaker = {}));
