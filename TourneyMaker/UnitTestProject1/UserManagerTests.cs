﻿using System;
using TourneyMaker;
using TourneyMaker.Controllers;
using TourneyMaker.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace UnitTesting
{

    [TestClass]
    public class UserControllerTest
    {
        public static string GetRandomAlphaNumeric()
        {
            Random random = new Random();
            var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(chars.Select(c => chars[random.Next(chars.Length)]).Take(8).ToArray());
        }

        [TestMethod]
        public void UserRegisterTest()
        {
            bool registered = false;
            UserInfo TestUser = new UserInfo();
            TestUser.email = GetRandomAlphaNumeric() + GetRandomAlphaNumeric() + "@test.com";
            TestUser.password = "test123";
            TestUser.username = GetRandomAlphaNumeric() + GetRandomAlphaNumeric();

            UserManager TestUserManager = new UserManager();
            registered = TestUserManager.Register(TestUser.username, TestUser.password, TestUser.email);
            Assert.IsTrue(registered == true);
        }

        [TestMethod]
        public void UserLoginTest()
        {
            string TestUserName = "testname";
            string TestUserPass = "testpass123";
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

            TestUserInfo = TestUserManager.GetUser("testuser@test.com");
            Assert.AreEqual(TestUserInfo.username, "testname");
            
        }

        [TestMethod]
        public void Getuser2Test()
        {
            UserInfo TestUserInfo = new UserInfo();
            UserManager TestUserManager = new UserManager();

            TestUserInfo = TestUserManager.GetUsername("testname");
            Assert.AreEqual(TestUserInfo.email, "testuser@test.com");

        }

        [TestMethod]
        public void CheckUserParamsTest()
        {
            bool available = false;
            UserManager TestUserManager = new UserManager();
            available = TestUserManager.checkUserParams(GetRandomAlphaNumeric() + GetRandomAlphaNumeric());
            Assert.IsTrue(available);
        }
    }
}
