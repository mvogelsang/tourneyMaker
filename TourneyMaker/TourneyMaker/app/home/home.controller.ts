//this typescript module will be used to house all classes within the entire application
module TourneyMaker {
    //class houses the entire controller, export makes it public
    export class HomeController {

        private username: string;
        private email: string;
        private password: string;
        private rePassword: string;

        private validPassError: boolean = false;


        //inject any dependencies such as any services we might need for this particular page
        public static $inject = ["$scope", "$location"];

        //if you injected anything, throw it in as an argument with the constructor, make sure its private
        constructor(private $scope: ng.IScope, private $location: ng.ILocationService) {

        }

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


        //in the html this function can be called by using vm.foo()
        //'vm' because we are setting this controllerAs in the routing file to 'vm'
        foo(): void {
            //do something
        }
    }
    //assigning this controller to the application, it is being assigned to the particular page in the routing file
    app.controller("HomeController", HomeController);
}