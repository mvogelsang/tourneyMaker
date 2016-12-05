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
            bool loggedIn = false;

            UserManager TestUserManager = new UserManager();
            TestUserManager.Login(TestUserName, TestUserPass);
            loggedIn = TestUserManager.Login(TestUserName, TestUserPass);
            Assert.IsTrue(loggedIn == true);
            
        }

        [TestMethod]
        public void GetuserTest()
        {
            UserInfo TestUserInfo = new UserInfo();
            UserManager TestUserManager = new UserManager();

            TestUserInfo = TestUserManager.GetUser("test@test.com");
            Assert.AreEqual(TestUserInfo.username, "testUser123");
            
        }

        [TestMethod]
        public void Getuser2Test()
        {
            UserInfo TestUserInfo = new UserInfo();
            UserManager TestUserManager = new UserManager();

            TestUserInfo = TestUserManager.GetUser2("testUser123");
            Assert.AreEqual(TestUserInfo.email, "test@test.com");

        }
    }
}
