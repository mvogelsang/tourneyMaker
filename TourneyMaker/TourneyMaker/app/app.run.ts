module TourneyMaker {
    app.run(["$rootScope", "$location", function ($rootScope, $location) {
        $rootScope.$on("$routeChangeSuccess", function (uid) {
            //success
        });

        $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
            console.log(event);
            if (eventObj.authenticated === false) {
                $location.path("/");
            }
        });
    }]);
}