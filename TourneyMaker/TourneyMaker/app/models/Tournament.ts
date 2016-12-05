module TourneyMaker {
    export class Tournament {
        public tid: number;
        public tname: string;
        public numParticipants: number;
        public host: User;
        public managers: Array<User>;
        public participants: Array<User>;
        public rounds;
        public commaDlParts: Array<string>;

    }
}