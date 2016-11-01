module TourneyMaker {
    export class AuthService {

        private uid: number;

        public static $inject = ["$http", "$cookies", "$q"];

        constructor(private $http: ng.IHttpService, private $cookies, private $q: ng.IQService) {
            if (this.$cookies) {  
                this.uid = this.$cookies.get('uid');
            }
        }


        login(): void {
            //http POST
            //success
            this.uid = this.$cookies.get('uid');
            
        }

        getUid(): number {
            return this.uid;
        }

    }

    app.service("AuthService", AuthService);
}