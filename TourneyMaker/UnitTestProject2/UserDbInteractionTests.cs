using System;
using TourneyMaker;
using TourneyMaker.Controllers;
using TourneyMaker.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace UnitTestProject2
{
    [TestClass]
    public class UserDbInteractionTests
    {
        public static string GetRandomAlphaNumeric()
        {
            Random random = new Random();
            var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(chars.Select(c => chars[random.Next(chars.Length)]).Take(8).ToArray());
        }

        [TestMethod]
        public void UserDbIntegration()
        {
            UserInfo TestUserInfo = new UserInfo();
            UserManager TestUserManager = new UserManager();

            TestUserInfo.username = GetRandomAlphaNumeric();
            TestUserInfo.password = GetRandomAlphaNumeric();
            TestUserInfo.email = GetRandomAlphaNumeric() + GetRandomAlphaNumeric() + "@test.com";

            Assert.IsFalse(TestUserManager.Login(TestUserInfo.username, TestUserInfo.password));

            Assert.IsTrue(TestUserManager.Register(TestUserInfo.username, TestUserInfo.password, TestUserInfo.email));
            Assert.IsTrue(TestUserManager.Login(TestUserInfo.username, TestUserInfo.password));

        }
    }
}
