module TourneyMaker {
    export class ViewTournamentController {

        private isEditingScore: boolean = false;

        private offset: number = 50;

        private bracket;
        private top = new Array<any>();
        private bottom = new Array<any>();

        private tourney = {
            tid: 0
        }

        private tournament: Tournament;

        private user = {
            username: "",
            password: "",
            email: ""
        };

        private addedManager: boolean = false;

        private isDirty: boolean = false;


        public static $inject = ["$scope", "$location", "$uibModal", "BracketService", "$log", "AuthService", "$routeParams", "$cookies", "$route", "$timeout"];

        constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private $uibModal, private bracketService: BracketService, private $log: ng.ILogService, private authService: AuthService, private $routeParams, private $cookies, private $route, private $timeout) {
            //bracketService.getBracket().then((data): any => {
            //    this.bracket = data.data;
            //}).catch((error): any => {
            //    this.$log.error("There was an error loading bracket");
            //    this.$log.error(error);
            //    });

            this.addedManager = false;
            this.isDirty = false;
            this.user.username = this.$cookies.get('uid');

            this.tourney.tid = this.$routeParams.id;

            this.bracketService.getTournament(this.user, this.tourney).then((data): any => {
                this.tournament = data.data;
                this.bracket = this.tournament.rounds;
                this.sort();
            });


        }

        private manager = {
            email: "",
        };

        private addManager(email): void {

            var manager = {
                email: email
            };

            this.bracketService.addManager(manager, this.tourney).then((data): any => {
                this.manager.email = "";
                this.addedManager = true;
            });
        }

        private updateScores(mid, s1, s2, w, tid): void {

            var matchup = {
                mid: mid,
                p1score: s1,
                p2score: s2,
                winner: w
            };

            var tournament = {
                tid: tid,
            }

            this.bracketService.updateMatchups(matchup, tournament).then((data): any => {
                this.isDirty = true;
            });
        }

        private save(): void {
            this.$route.reload();
        }

        private sort(): void {
            for (var i = 0; i < this.bracket.length; i++) {
                this.bracket[i].isEditing = false;
                if (i % 2 == 0) {
                    this.top.push(this.bracket[i]);
                }
                else {
                    this.bottom.push(this.bracket[i]);
                }
            }
        }

        private openProfile(profile): void {
            this.$uibModal.open({
                animation: true,
                templateUrl: 'app/public-profile/public-profile.tpl.html',
                controller: 'PublicProfileController',
                controllerAs: 'vm',
                //pass in all information we need to display a profile
                resolve: {
                    profile: () => profile
                }
            });
        }

        private close(): void {
            this.$location.path('/dashboard/' + this.authService.userLoggedIn.username + '/active-tournaments');
        }

        private edit(): void {
            if (this.isEditingScore) {
                this.isEditingScore = false;
            }
            else {
                this.isEditingScore = true;
            }
        }


    }

    app.controller("ViewTournamentController", ViewTournamentController);
}