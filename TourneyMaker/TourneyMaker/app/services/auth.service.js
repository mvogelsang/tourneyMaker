var TourneyMaker;
(function (TourneyMaker) {
    var AuthService = (function () {
        function AuthService($http, $cookies, $q, userService, $location) {
            this.$http = $http;
            this.$cookies = $cookies;
            this.$q = $q;
            this.userService = userService;
            this.$location = $location;
            if (this.$cookies.get('uid')) {
                this.uid = this.$cookies.get('uid');
            }
        }
        AuthService.prototype.login = function () {
            var _this = this;
            var defer = this.$q.defer();
            //http POST
            //success
            this.userService.getUser().then(function (data) {
                _this.user = data.data;
                _this.$cookies.put('uid', _this.user.uid);
                _this.uid = _this.$cookies.get('uid');
                _this.$location.path('dashboard/' + _this.getUid() + '/active-tournaments');
                defer.resolve(_this.uid);
            }).catch(function (error) {
                //log error
            });
            return defer.promise;
        };
        AuthService.prototype.getUid = function () {
            return this.uid;
        };
        AuthService.$inject = ["$http", "$cookies", "$q", "UserService", "$location"];
        return AuthService;
    }());
    TourneyMaker.AuthService = AuthService;
    TourneyMaker.app.service("AuthService", AuthService);
})(TourneyMaker || (TourneyMaker = {}));
//# sourceMappingURL=auth.service.js.map