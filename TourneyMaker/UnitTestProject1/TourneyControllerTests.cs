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
        public void GetTourneyInfoTest()
        {
            Assert.AreEqual(1, 0);
        }

        [TestMethod]
        public void NewTourneyTest()
        {
            Assert.AreEqual(1, 0);
        }

        [TestMethod]
        public void AddManagersTest()
        {
            Assert.AreEqual(1, 0);
        }
    }
}
