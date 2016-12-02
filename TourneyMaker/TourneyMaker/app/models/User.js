var TourneyMaker;
(function (TourneyMaker) {
    var User = (function () {
        function User() {
        }
        User.prototype.User = function (_uname, _pword, _email) {
            this.username = _uname;
            this.password = _pword;
            this.email = _email;
        };
        return User;
    }());
    TourneyMaker.User = User;
})(TourneyMaker || (TourneyMaker = {}));
