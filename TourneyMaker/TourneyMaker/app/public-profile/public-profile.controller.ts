module TourneyMaker {
    export class PublicProfileController {
        public static $inject = ["$uibModalInstance"];

        constructor(private $uibModalInstance) {

        }

        private close(): void {
            this.$uibModalInstance.dismiss('cancel');
        }
        
    }

    app.controller("PublicProfileController", PublicProfileController);
}