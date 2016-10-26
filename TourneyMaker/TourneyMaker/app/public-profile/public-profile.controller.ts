module TourneyMaker {
    export class PublicProfileController {

        private profileObj;

        public static $inject = ["$uibModalInstance", "profile"];

        constructor(private $uibModalInstance, private profile) {
            this.profileObj = profile;
        }

        private close(): void {
            this.$uibModalInstance.dismiss('cancel');
        }
        
    }

    app.controller("PublicProfileController", PublicProfileController);
}