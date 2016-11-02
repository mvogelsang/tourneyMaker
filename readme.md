# TourneyMaker Layman Documentation

## Database Setup
The database will have the following TABLES and ATTRIBUTES with potential attributes that will support non-mvp features shown in *italics*, and MVP attributes shown in **bold**.

TOURNAMENT  
  - **TID** - db identifier
  - **HOST** - user id
  - **SIZE** - an integer greater than 1 representing the number of particpants in the tournament
  - **TYPE** - a string or number ??
  - *STARTDATE* - ISO date signifying the beginning of the tournament
  - *END DATE* - ISO date signifying the hard end of the tournament
  - *MATCHUP DATE* - I forget what this even does

PARTICIPATION  
  - **TID** - a tournament's TID
  - **UID** - a user's UID
  - **PLEVEL** - The permission level associated with the user for this tournament (0 - host, 1 - manager, 2 - participant)
  - **ACTIVE** - a boolean value signifying if the user is participating in this tournament (essentially, if the tournament is still going on or not)

USER  
  - **UID** - db identifier
  - **NAME** - User's personal name
  - **EMAIL** - email string
  - **USERNAME** - the user's site username/handle/nickname
  - **PASSWORD** - the user's password, unhashed and unsalted for now (BAD)
  - **BIO** - string representing the user's bio
  - _TIMEZONE_ - user's preferred time zone
  - _WINS_ - user's total match wins
  - _LOSSES_ - user's total match losses

## Tournament Related Controller API  
 - vm.createTournament( _args_ )  
  - takes args from _create tournament_ page and creates the correct DB entities
 - vm.deleteTournament( TID, loginCookie )
  - removes all entries with TID from PARTICIPATION and USER table
 - vm.addManager(TID, UID/username, loginCookie)

## Tournament Rendering Algorithm
~~for now, simple stacked boxes will be rendered. Eventually we will be settle on a method for rendering them in a correctly shaped manner with lines drawn in between.~~

## Acceptance Testing  

### Installation and Setup
1. Enable the ubuntu subsystem on windows 10 and get it set up for general development. (see the link [here](http://iamnotmyself.com/2016/07/01/running-ghost-on-ubuntu-on-windows/). Follow all the steps except those involving ghost. This will get npm set up on the subsystem as well)

2. make a folder in your subsystem home directory for the repo for convenience  
`cd ~`  
`mkdir repos`  
`cd repos`  
`git clone https://github.com/mvogelsang/tourneyMaker.git`


## MISC
C# calls out to stored procedures
clicking team user brings up clicked name's profile
