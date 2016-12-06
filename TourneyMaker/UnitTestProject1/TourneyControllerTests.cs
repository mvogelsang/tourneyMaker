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
            String res = test.GetTourney(tint);
            Assert.AreNotEqual(res, "");
        }

        [TestMethod]
        public void NewTourneyTest()
        {
            Assert.AreEqual(1, 0);
        }

    }
}
