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
            Assert.AreEqual(1, 0);
        }

        [TestMethod]
        public void CreateNewTourneyTest()
        {
            Assert.AreEqual(1, 0);
        }

        [TestMethod]
        public void SetTourneyUsersTest()
        {
            Assert.AreEqual(1, 0);
        }

        [TestMethod]
        public void GetMatchupsTest()
        {
            Assert.AreEqual(1, 0);
        }

        [TestMethod]
        public void GetDisplayTest()
        {
            Assert.AreEqual(1, 0);
        }
    }
}
