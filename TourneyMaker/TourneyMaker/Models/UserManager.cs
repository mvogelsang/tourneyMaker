using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace TourneyMaker.Models
{
    public class UserManager
    {
        public UserInfo info;
        public UserManager()
        {
            info = new UserInfo();
        }

        public UserInfo GetUser(string email)
        {
            UserInfo ui = new UserInfo();
            //get info on user from DB based on email
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getUser", conn);
                cmd.Parameters.AddWithValue("@email", email);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        ui.uid = Convert.ToInt32(dr["uid"]);
                        ui.password = dr["password"].ToString();
                        ui.username = dr["username"].ToString();
                        ui.bio = dr["bio"].ToString();
                        ui.name = dr["name"].ToString();
                    }
                }
            }
            return ui;
        }

        public UserInfo GetUsername(string username)
        {
            UserInfo ui = new UserInfo();
            //get info on user from DB based on username
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getUser2", conn);
                cmd.Parameters.AddWithValue("@username", username);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        ui.uid = Convert.ToInt32(dr["uid"]);
                        ui.password = dr["password"].ToString();
                        ui.username = dr["username"].ToString();
                        ui.email = dr["email"].ToString();
                        ui.bio = dr["bio"].ToString();
                        ui.name = dr["name"].ToString();
                    }
                }
            }
            return ui;
        }

        public bool checkUserParams(string username)
        {
            bool isAvailable = false;
            int avail = 0;
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.checkUser", conn);
                cmd.Parameters.AddWithValue("@username", username);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        avail = Convert.ToInt32(dr["isAvailable"]);
                    }
                }
            }
            if(avail == 1)
            {
                isAvailable = true;
            }

            return isAvailable;
        }

        public void modifyUserProfile(UserInfo info)
        {
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.modifyUserProfile", conn);
                cmd.Parameters.AddWithValue("@uid", info.uid);
                cmd.Parameters.AddWithValue("@name", info.name);
                cmd.Parameters.AddWithValue("@bio", info.bio);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.ExecuteNonQuery();
            }
        }

        public bool Register(string username, string password, string email)
        {
            bool registered = false;
            int success = 0;
            int uid = 0;
            if (checkUserParams(username))
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("dbo.registerUser", conn);
                    cmd.Parameters.AddWithValue("@username", username);
                    cmd.Parameters.AddWithValue("@password", password);
                    cmd.Parameters.AddWithValue("@email", email);
                    cmd.CommandType = CommandType.StoredProcedure;

                    //Check if the email exists in the database, if it is already there, update the username and password if they are null.
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            //isRegistered will be an int in the database that is set at 0 or 1
                            success = Convert.ToInt32(dr["isRegistered"]);
                            uid = Convert.ToInt32(dr["uid"]);
                        }
                    }
                }

                if (success == 1)
                {
                    registered = true;
                    info.uid = uid;
                    info.username = username;
                    info.password = password;
                    info.email = email;
                    //send email to user of success
                }
            }
            return registered;
        }

        public bool Login(string username, string password)
        {
            bool authorized = false;
            string email = "";
            int uid = 0;
            //Check database for username and password verification
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                //loginUser will take the username parameter and accept an optional password parameter
                SqlCommand cmd = new SqlCommand("dbo.loginUser", conn);
                cmd.Parameters.AddWithValue("@username", username);
                cmd.Parameters.AddWithValue("@password", password);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        //isAuthorized will be an int in the database that is set at 0 or 1
                        //this procedure will return both the int and the user's password and email
                        password = dr["password"].ToString();
                        email = dr["email"].ToString();
                        uid = Convert.ToInt32(dr["uid"]);
                    }
                }

            }
            if (!string.IsNullOrEmpty(email))
            {
                authorized = true;
                info.uid = uid;
                info.username = username;
                info.password = password;
                info.email = email;
            }
            return authorized;
        }
    }

    public class UserInfo
    {
        public int uid { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string name { get; set; }
        public string bio { get; set; }
        public UserInfo()
        {
            uid = 0;
            username = "";
            password = "";
            email = "";
            name = "";
            bio = "";
        }
    }
}