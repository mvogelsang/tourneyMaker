module TourneyMaker {
    export class AuthService {

        private user: User;
        private uid: number;

        public static $inject = ["$http", "$cookies", "$q", "UserService", "$location", "$route"];

        constructor(private $http: ng.IHttpService, private $cookies, private $q: ng.IQService, private userService: UserService, private $location: ng.ILocationService, private $route) {
            if (this.$cookies.get('uid')) {  
                this.uid = this.$cookies.get('uid');
            }
        }


        login(user): ng.IPromise<any> {

            var defer = this.$q.defer();

            //http POST
            //success
            this.userService.getUser(user).then((data): any => {
                this.user = data.data;
                this.$cookies.put('uid', this.user.username);
                this.uid = this.$cookies.get('uid');
                this.$location.path('dashboard/' + this.getUid() + '/active-tournaments');
                this.$route.reload();
                
                
                defer.resolve(this.uid);
            }).catch((error): any => {
                //log error
                });

            return defer.promise;
            
        }

        getUid(): number {
            return this.uid;
        }

    }

    app.service("AuthService", AuthService);
}