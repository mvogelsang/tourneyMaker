using System;
using TourneyMaker;
using TourneyMaker.Controllers;
using TourneyMaker.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTesting
{
    [TestClass]
    public class UserControllerTest
    {
        [TestMethod]
        public void UserRegisterTest()
        {
            bool registered = false;
            UserInfo TestUser = new UserInfo();
            TestUser.email = "test@test.com";
            TestUser.password = "test123";
            TestUser.username = "testUser123";

            UserManager TestUserManager = new UserManager();
            registered = TestUserManager.Register(TestUser.username, TestUser.password, TestUser.email);
            Assert.IsTrue(registered == true);
        }

        [TestMethod]
        public void UserLoginTest()
        {
            string TestUserName = "testuser123";
            string TestUserPass = "test123";

            UserManager TestUserManager = new UserManager();
            TestUserManager.Login(TestUserName, TestUserPass);

            // Assert.AreEqual(TestUserManager.authorized == true);

        }
    }
}
