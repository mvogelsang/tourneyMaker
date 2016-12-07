using System;
using TourneyMaker;
using TourneyMaker.Controllers;
using TourneyMaker.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace UnitTestProject2
{
    [TestClass]
    public class TournamentDbInteractionTests
    {
        public static string GetRandomAlphaNumeric()
        {
            Random random = new Random();
            var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(chars.Select(c => chars[random.Next(chars.Length)]).Take(8).ToArray());
        }

        [TestMethod]
        public void TournamentDbIntegration()
        {
            Tournament t = new Tournament();
            Tournament res = new Tournament();
            t.host.username = "testname";
            t.host.email = "testuser@test.com";
            t.numParticipants = 4;
            t.tname = GetRandomAlphaNumeric();
            t.commaDlParts = "1,2,3,4";
            TourneyManager test = new TourneyManager();
            res = test.CreateNewTourney(t);

            Assert.IsTrue(test.GetTournament(res.tid).tname == t.tname);
        }
    }
}
