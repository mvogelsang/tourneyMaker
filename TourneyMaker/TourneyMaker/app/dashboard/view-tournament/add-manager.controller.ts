module TourneyMaker {
    export class AddManagerController {

        private manager = {
            email: ""
        };

        private tourney = {
            tid: 0
        };

        public static $injext = ["uibModalInstance", "BracketService", "$routeParams"];

        constructor(private $uibModalInstance, private bracketService: BracketService, private $routeParams) {
            this.tourney.tid = this.$routeParams.id;
        }

        private add(): void {
            this.bracketService.addManager(this.manager, this.tourney).then((data): any => {

            });
        }

        private close(): void {
            this.$uibModalInstance.dismiss('cancel');
        }
    }

    app.controller('AddManagerController', AddManagerController);
}