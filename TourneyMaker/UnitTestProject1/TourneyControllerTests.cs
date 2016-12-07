using System;
using TourneyMaker;
using TourneyMaker.Controllers;
using TourneyMaker.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace UnitTestProject1
{
    [TestClass]
    public class TourneyControllerTests
    {
        public static string GetRandomAlphaNumeric()
        {
            Random random = new Random();
            var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(chars.Select(c => chars[random.Next(chars.Length)]).Take(8).ToArray());
        }

        [TestMethod]
        public void GetTourneyTest()
        {
            TourneyController test = new TourneyController();
            TourneyController.TourneyInt tint = new TourneyController.TourneyInt();
            tint.tid = 4;
            UserInfo TestUserInfo = new UserInfo();
            TestUserInfo.email = "testuser@test.com";
            String res = test.GetTourney(TestUserInfo, tint);
            Assert.AreNotEqual(res, "");
        }

        [TestMethod]
        public void NewTourneyTest()
        {
            TourneyController TestTourneyController = new TourneyController();
            UserInfo TestUserInfo = new UserInfo();
            Tournament TestTournament = new Tournament();

            TestTournament.tname = GetRandomAlphaNumeric() + GetRandomAlphaNumeric();
            TestTournament.numParticipants = 4;
            TestTournament.host.email = "testuser@test.com";
            TestTournament.commaDlParts = "testuser2@test.com,testuser3@test.com,testuser4@test.com";

            TestUserInfo.email = "testuser@test.com";
            Assert.IsNotNull(TestTourneyController.NewTourney(TestUserInfo, TestTournament));
            
        }

    }
}
