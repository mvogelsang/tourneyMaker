# TourneyMaker Layman Documentation

## Database Setup
The database will have the following TABLES and ATTRIBUTES with potential attributes that will support non-mvp features shown in *italics*, and MVP attributes shown in **bold**.

TOURNAMENT  
  - **TID** - db identifier
  - **HOST** - user id
  - **SIZE** - an integer greater than 1 representing the number of particpants in the tournament (6 round max... 64 players)
  - **TYPE** - integer starting at 0 (0 - single elimination, 1 - double elimination)
  - *STARTDATE* - ISO date signifying the beginning of the tournament
  - *END DATE* - ISO date signifying the hard end of the tournament
  - *MATCHUP DATE* - I forget what this even does

PARTICIPANT
  - **TID** - a tournament's TID
  - **UID** - a user's UID
  - **PLEVEL** - The permission level associated with the user for this tournament (0 - host, 1 - manager, 2 - participant)
  - **ACTIVE** - a boolean value signifying if the user is participating in this tournament (essentially, if the tournament is still going on or not)

USER  
  - **UID** - db identifier
  - **NAME** - User's personal name
  - **EMAIL** - email string, verified
  - **USERNAME** - the user's site username/handle/nickname, alphanumeric, 12 char max
  - **PASSWORD** - the user's password, unhashed and unsalted for now (BAD), alphanumeric, min 8, max 20
  - **BIO** - string representing the user's bio, max length 140
  - _TIMEZONE_ - user's preferred time zone
  - _WINS_ - user's total match wins
  - _LOSSES_ - user's total match losses

SINGLES
  - **MID** - matchup id
  - **TID** - tournament id
  - **P1** - p1 uid
  - **P2** - p2 uid
  - **P1SCORE**
  - **P2SCORE**
  - **WINNER**- p1 or p2's ID (eventually set)

DOUBLES
  - **MID** - matchup id
  - **TID** - tournament id
  - **T1** - t1 teamid
  - **T2** - t2 teamid
  - **T1SCORE** -
  - **T2SCORE** -
  - **WINNER** - teamid of winner

TEAM
 - **TEAMID**
 - **P1ID**
 - **P2ID**

## Tournament Related Controller API  
 - vm.createTournament( _args_ )  
  - takes args from _create tournament_ page and creates the correct DB entities (depending on details, matchups in a particular table)
 - vm.deleteTournament( TID, loginCookie )
  - removes all entries with TID from PARTICIPATION and USER table and corresponding matchup table
 - ~~vm.addManager(TID, UID/username, loginCookie)~~
 - vm.updateScore(UID, TID, MID, SCORE1, SCORE2)
 - vm.declareWinner(UID, TID, MID, WID)
  - permissioned UID's include managers and hosts generically
 - vm.forfeit(UID, TID, MID)
  - check that UID is in the MATCH, declare other ID winner. for doubles it'll have to check into the team table.

## Tournament Rendering Algorithm
~~for now, simple stacked boxes will be rendered. Eventually we will be settle on a method for rendering them in a correctly shaped manner with lines drawn in between.~~

## MISC
C# calls out to stored procedures
clicking team user brings up clicked name's profile
