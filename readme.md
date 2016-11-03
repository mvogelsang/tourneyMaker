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

## Acceptance Testing  
Our acceptance tests are built on [Chimp](https://github.com/xolvio/chimp) (which is powered by [WebDriverIO](http://webdriver.io/api.html)) with [Cucumber](https://chimp.readme.io/docs/cucumberjs) using [Chai](http://chaijs.com/api/bdd/)'s _expect_ BDD Assertion API.
Cucumber feature specifications are written in [Gherkin](https://cucumber.io/docs/reference#gherkin).

Further background and resources for each of these tools are provided below.

### Installation and Setup
1. Install node version 6.6 using the appropriate windows .msi file from [here](https://nodejs.org/en/blog/release/v6.6.0/)

2. install jdk 8 from [here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

4. install chimp. In a command line do  
`npm install -g chimp`

5. initialize chimp and do general setup by running chimp with no args. in a command prompt...  
`chimp`

6. the specific commands needed to run the tests already exist as npm scripts. So running the test suite is as easy as cd-ing to the _acceptance-testing_ folder 

#### Background on our toolkit

Writing acceptance tests is straightforward once you're familiar with the tools. All the feature files and step definition files go in the _acceptance-testing_ folder in the root of this repo.

##### Chimp

Get introduced to writing tests and the chimp documentation site [here](https://chimp.readme.io/docs/tutorial) (no need to do the exercises, just skim through it.)  

##### Features and Gherkin

Feature files are written in Gherkin. Read [this](https://cucumber.io/docs/reference#gherkin) fairly short article on Gherkin to understand its capabilities.

The key points gained from this article are:
1. Usage of the keywords _Given_, _When_, _Then_, _And_, and _But_
2. Knowledge of how to write Features, Backgrounds, Scenarios, and Scenario Outlines
3. Better familiarity with writing Steps

##### Regex and Step Identifiers

Steps are defined in files that export step definitions. Steps are identified by Regular Expressions (Regex) that follow after a Gherkin keyword.  
Luckily we don't need to know much Regex to write effective steps. Read [this ](http://agileforall.com/just-enough-regular-expressions-for-cucumber/) to finish mastering writing step definition identifiers.

The key points gained from this article:
1. A generic understanding of regular Expressions
2. knowledge that all parameters to steps are **ALWAYS** passed as **Strings**
3. Capturing parameters using (\d+) and ([^"]\*)
4. using ^ and & to signify the beginning and end of a line
5. writing a useful step identifier

##### Controlling the Browser with WebdriverIO

In our step definitions we can control a test browser and get information from it.  
We have full access to the webdriverIO API. WebdriverIO lets us do things like click elements on a page, load certain URL's, and get information back from the page. Glance through the API (**Especially** the *Action* and *Utility* sections) [here](http://webdriver.io/api.html).  
*NOTE: with chimp we write __browser.command()__ instead of __client.command()__*

##### Assertions with Chai Expect

A key part of testing is making assertions. We'll be using Chai's BDD interface to manage our assertions. Specifically, we will be using the 'expect' interface (**Do not use the 'should' interface**)  
Read more about it [here](http://chaijs.com/api/bdd/).

### Trouble Shooting, Notes, and Warnings

- Make sure your test steps allow enough time for changes to take place in the browser. Functions like 'browser.waitForVisible()' and 'browser.waitForExists()' are necessary for this. These functions *by default have a maximum wait time of 500 milliseconds* before throwing an error. If these tests fail, make sure it isn't a timing issue. You can provide a second argument to set the maximum wait time. See the webdriver documentation (ex. [waitForExist()](http://webdriver.io/api/utility/waitForExist.html)).

## MISC
C# calls out to stored procedures
clicking team user brings up clicked name's profile
