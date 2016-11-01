var TourneyMaker;
(function (TourneyMaker) {
    var AuthService = (function () {
        function AuthService($http, $cookies, $q) {
            this.$http = $http;
            this.$cookies = $cookies;
            this.$q = $q;
            if (this.$cookies) {
                this.uid = this.$cookies.get('uid');
            }
        }
        AuthService.prototype.login = function () {
            //http POST
            //success
            this.uid = this.$cookies.get('uid');
        };
        AuthService.prototype.getUid = function () {
            return this.uid;
        };
        AuthService.$inject = ["$http", "$cookies", "$q"];
        return AuthService;
    }());
    TourneyMaker.AuthService = AuthService;
    TourneyMaker.app.service("AuthService", AuthService);
})(TourneyMaker || (TourneyMaker = {}));
