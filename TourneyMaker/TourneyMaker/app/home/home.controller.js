//this typescript module will be used to house all classes within the entire application
var TourneyMaker;
(function (TourneyMaker) {
    //class houses the entire controller, export makes it public
    var HomeController = (function () {
        //if you injected anything, throw it in as an argument with the constructor, make sure its private
        function HomeController($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            this.validPass = false;
        }
        HomeController.prototype.createAccount = function (form) {
            if (form.$valid) {
                //POST to database
                //GET userID and append to dashboard (/dashboard:{userId})
                this.$location.path('/dashboard');
            }
            else {
                return;
            }
        };
        //change to validate all inputs
        HomeController.prototype.validatePassword = function (form) {
            if (this.password === this.rePassword) {
                this.validPass = false;
                return true;
            }
            else {
                this.validPass = true;
                form.$valid = false;
                return false;
            }
        };
        //in the html this function can be called by using vm.foo()
        //'vm' because we are setting this controllerAs in the routing file to 'vm'
        HomeController.prototype.foo = function () {
            //do something
        };
        //inject any dependencies such as any services we might need for this particular page
        HomeController.$inject = ["$scope", "$location"];
        return HomeController;
    }());
    TourneyMaker.HomeController = HomeController;
    //assigning this controller to the application, it is being assigned to the particular page in the routing file
    TourneyMaker.app.controller("HomeController", HomeController);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=home.controller.js.map