module TourneyMaker {
    export class Tournament {
        tid: number;
        tname: string;
        numParticipants: number;
        host: User;
        managers: Array<User>;
        participants: Array<User>;
        rounds;
        commaDlParts: Array<string>;

    }
}