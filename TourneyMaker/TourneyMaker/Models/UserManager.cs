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
        UserInfo info;
        bool isAuthorized;
        public UserManager()
        {
            info = new UserInfo();
            isAuthorized = false;
        }

        public bool Register(string username, string password, string email)
        {
            bool registered = false;
            int success = 0;
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.registerUser", conn);
                cmd.Parameters.AddWithValue("@username", username);
                cmd.Parameters.AddWithValue("@password", password);
                cmd.Parameters.AddWithValue("@email", email);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        //isRegistered will be an int in the database that is set at 0 or 1
                        success = Convert.ToInt32(dr["isRegistered"]);

                    }
                }
            }

            if (success == 1)
            {
                registered = true;
                isAuthorized = true;
                info.username = username;
                info.password = password;
                info.email = email;
                //send email to user of success
            }

            return registered;
        }

        public bool Login(string username, string password)
        {
            bool authorized = false;
            int check = 0;
            string email = "";
            //Check database for username and password verification
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                //loginUser will take the username parameter and accept an optional password parameter
                SqlCommand cmd = new SqlCommand("dbo.loginUser", conn);
                cmd.Parameters.AddWithValue("@username", username);
                if (!string.IsNullOrEmpty(password))
                {
                    cmd.Parameters.AddWithValue("@password", password);
                }
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        //isAuthorized will be an int in the database that is set at 0 or 1
                        //this procedure will return both the int and the user's password and email
                        check = Convert.ToInt32(dr["authorized"]);
                        password = dr["password"].ToString();
                        email = dr["email"].ToString();
                    }
                }

            }
            if (check == 1)
            {
                isAuthorized = true;
                authorized = true;
                info.username = username;
                info.password = password;
                info.email = email;
            }
            return authorized;
        }
    }

    public class UserInfo
    {
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public UserInfo()
        {
            username = "";
            password = "";
            email = "";
        }
    }
}