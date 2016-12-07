using System;
using TourneyMaker;
using TourneyMaker.Controllers;
using TourneyMaker.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        public static string GetRandomAlphaNumeric()
        {
            Random random = new Random();
            var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(chars.Select(c => chars[random.Next(chars.Length)]).Take(8).ToArray());
        }


        [TestMethod]
        public void GetAllTourneysTest()
        {
            string username = GetRandomAlphaNumeric();
            TourneyManager test = new TourneyManager();
            TournamentList tl = test.GetAllTourneys(username);
            Assert.IsNotNull(tl);
        }

        [TestMethod]
        public void CreateNewTourneyTest()
        {
            Tournament t = new Tournament();
            t.host.username = "testname";
            t.host.email = "testuser@test.com";
            t.numParticipants = 4;
            t.tname = GetRandomAlphaNumeric();
            t.commaDlParts = "1,2,3,4";
            TourneyManager test = new TourneyManager();
            Assert.IsTrue(test.CreateNewTourney(t).GetType() == t.GetType());
        }

        [TestMethod]
        public void SetTourneyUsersTest()
        {
            Tournament TestTournament = new Tournament();
            TestTournament.tid = 4;
            TestTournament.SetTourneyUsers();
            Assert.IsNotNull(TestTournament.participants);

        }

        [TestMethod]
        public void GetMatchupsTest()
        {
            Tournament TestTournament = new Tournament();
            TestTournament.tid = 4;
            TestTournament.GetMatchups();
            Assert.IsNotNull(TestTournament.ml);

        }

        [TestMethod]
        public void GetDisplayTest()
        {
            //Tournament TestTournament = new Tournament();
            //TourneyManager TestTourneyManager = new TourneyManager();
            //UserInfo TestUserInfo = new UserInfo();
            //TestUserInfo.email = "testuser@test.com";
            //TestTournament = TestTourneyManager.GetTournament(4);
            //TestTournament.GetDisplay();
            //not blowing up means it passed
        }
    }
}
