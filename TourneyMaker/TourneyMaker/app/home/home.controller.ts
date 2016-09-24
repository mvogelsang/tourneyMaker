//this typescript module will be used to house all classes within the entire application
module TourneyMaker {
    //class houses the entire controller, export makes it public
    export class HomeController {

        //inject any dependencies such as any services we might need for this particular page
        public static $inject = ["$scope"];

        //if you injected anything, throw it in as an argument with the constructor, make sure its private
        constructor(private $scope: ng.IScope) {

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