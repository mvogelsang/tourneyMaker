using System;
using TourneyMaker;
using TourneyMaker.Controllers;
using TourneyMaker.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace UnitTestProject1
{
    [TestClass]
    public class UserControllerTests
    {
        public static string GetRandomAlphaNumeric()
        {
            Random random = new Random();
            var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(chars.Select(c => chars[random.Next(chars.Length)]).Take(8).ToArray());
        }

        [TestMethod]
        public void RegisterUserTest()
        {
            UserInfo TestUser = new UserInfo();
            TestUser.email = GetRandomAlphaNumeric() + GetRandomAlphaNumeric() + "@test.com";
            TestUser.password = "test123";
            TestUser.username = GetRandomAlphaNumeric() + GetRandomAlphaNumeric();

            UserController tested = new UserController();

            String result = tested.RegisterUser(TestUser);
            StringAssert.Contains(result, "uid");
        }

        [TestMethod]
        public void LoginUserTest()
        {
            UserInfo TestUser = new UserInfo();
            UserController TestUserController = new UserController();

            TestUser.username = "testname";
            TestUser.password = "testpass";

            Assert.IsNotNull(TestUserController.LoginUser(TestUser));
        }

        [TestMethod]
        public void GetUserTest()
        {
            UserInfo TestUser = new UserInfo();
            UserController TestUserController = new UserController();

            TestUser.username = "testname";

            Assert.IsNotNull(TestUserController.GetUser(TestUser));
        }
    }
}
