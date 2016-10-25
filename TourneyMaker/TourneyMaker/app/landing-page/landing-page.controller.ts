module TourneyMaker {
    export class LandingPageController {

        //will be set 
        private isLoggedIn: boolean = false;  

        public static $inject = ["$location"]

        constructor(private $location: ng.ILocationService) {
            if (this.$location.path() == "/home" || this.$location.path() == "http://localhost:58494/") {
                this.isLoggedIn = false;
            }
            else {
                this.isLoggedIn = true;
            }
        }

        //the 1 will be replaced by the users id
        setActiveTourmaments(): void {
            this.$location.path('dashboard/1/active-tournaments');
            
        }

        setCompletedTourmaments(): void {
            this.$location.path('dashboard/1/completed-tournaments');
        }

        setProfile(): void {
            this.$location.path('dashboard/1/profile');
        }

        setTournamentManagement(): void {
            this.$location.path('dashboard/1/tournament-management');
        }
    }


    app.controller("LandingPageController", LandingPageController);
}