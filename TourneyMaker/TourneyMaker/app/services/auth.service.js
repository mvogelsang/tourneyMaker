var TourneyMaker;
(function (TourneyMaker) {
    var AuthService = (function () {
        function AuthService($http, $cookies, $q, userService, $location, $route) {
            this.$http = $http;
            this.$cookies = $cookies;
            this.$q = $q;
            this.userService = userService;
            this.$location = $location;
            this.$route = $route;
            if (this.$cookies.get('uid')) {
                this.uid = this.$cookies.get('uid');
            }
        }
        AuthService.prototype.login = function (user) {
            var _this = this;
            var defer = this.$q.defer();
            //http POST
            //success
            this.userService.getUser(user).then(function (data) {
                _this.userLoggedIn = data.data;
                _this.$cookies.put('uid', _this.userLoggedIn.username);
                _this.uid = _this.$cookies.get('uid');
                _this.$location.path('dashboard/' + _this.getUid() + '/active-tournaments');
                _this.$route.reload();
                defer.resolve(_this.uid);
            }).catch(function (error) {
                //log error
            });
            return defer.promise;
        };
        AuthService.prototype.getUid = function () {
            return this.uid;
        };
        AuthService.$inject = ["$http", "$cookies", "$q", "UserService", "$location", "$route"];
        return AuthService;
    }());
    TourneyMaker.AuthService = AuthService;
    TourneyMaker.app.service("AuthService", AuthService);
})(TourneyMaker || (TourneyMaker = {}));
