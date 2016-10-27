module TourneyMaker {
    export class LandingPageController {

        //will be set 
        private isLoggedIn: boolean = false;  

        public static $inject = ["$scope", "$location"]

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService) {

            if (this.$location.absUrl() == "http://localhost:58494/#/home") {
                this.isLoggedIn = false;
            }
            else {
                this.isLoggedIn = true;
            }

            $scope.$watch(() => {
                return this.$location.absUrl();
            }, (newValue, oldValue) => {
                if (newValue != oldValue) {
                    if (newValue == "http://localhost:58494/#/home") {
                        this.isLoggedIn = false;
                    }
                    else {
                        this.isLoggedIn = true;
                    }
                }
            });
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

        private username: string;
        private email: string;
        private password: string;
        private rePassword: string;

        private validPassError: boolean = false;

        private createAccount(form, isLoggedIn): void {
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