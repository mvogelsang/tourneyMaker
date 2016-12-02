module TourneyMaker {
    export class User {
        uid: number;
        name: string;
        email: string;
        username: string;
        password: string;
        bio: string;

        public User(_uname, _pword, _email) {
            this.username = _uname;
            this.password = _pword;
            this.email = _email;
        }
    }
}