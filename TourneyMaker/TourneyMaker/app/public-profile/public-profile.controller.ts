module TourneyMaker {
    export class PublicProfileController {

        private userObj = {
            username: ""
        }

        private user = {
            username: "",
            name: "",
            bio: ""
        }

        private tournaments = new Array<Tournament>();

        public static $inject = ["$uibModalInstance", "profile", "UserService", "BracketService"];

        constructor(private $uibModalInstance, private profile, private userService: UserService, private bracketService: BracketService) {
            this.userObj.username = profile;
            this.userService.getUserByUsername(this.userObj).then((data): any => {
                this.user = data.data;
            });
            this.userService.getAllTourneys(this.userObj).then((data): any => {
                this.tournaments = data.data;
            });
        }

        private close(): void {
            this.$uibModalInstance.dismiss('cancel');
        }
        
    }

    app.controller("PublicProfileController", PublicProfileController);
}