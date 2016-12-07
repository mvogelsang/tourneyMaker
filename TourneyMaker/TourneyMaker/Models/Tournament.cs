using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Net;
using System.Net.Mail;

namespace TourneyMaker.Models
{

    public class TourneyManager
    {
        public TourneyManager() {}

        public Tournament GetTournament(string username, int tid)
        {
            DataTable dt = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getTourney", conn);
                cmd.Parameters.AddWithValue("@tid", tid);
                cmd.Parameters.AddWithValue("@username", username);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            Tournament temp = new Tournament(dt.Rows[0]);

            return temp;
        }

        public void UpdateMatchup(Matchup m, int tid)
        {
            if(m.winner > 0)
            {
                SetWinner(tid, m.mid, m.winner);
            }
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("dbo.modifyMatchup", conn);
                    cmd.Parameters.AddWithValue("@tid", tid);
                    cmd.Parameters.AddWithValue("@mid", m.mid);
                    cmd.Parameters.AddWithValue("@p1score", m.p1score);
                    cmd.Parameters.AddWithValue("@p2score", m.p2score);
                    cmd.Parameters.AddWithValue("@winner", m.winner);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }
            
        }

        public void SetWinner(int tid, int mid, int winner)
        {
            int nextmatch = 0;
            int nextplayer = 0;
            if(mid % 2 == 0)
            {
                nextmatch = (mid / 2) - 1;
                nextplayer = 1;
            }
            else if(mid % 2 == 1)
            {
                nextmatch = ((mid + 1) / 2) - 1;
                nextplayer = 2;
            }
            else
            {
                nextmatch = -1;
            }
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.decideMatchup", conn);
                cmd.Parameters.AddWithValue("@tid", tid);
                cmd.Parameters.AddWithValue("@mid", mid);
                cmd.Parameters.AddWithValue("@winner", winner);
                cmd.Parameters.AddWithValue("@nextmatch", nextmatch);
                cmd.Parameters.AddWithValue("@nextplayer", nextplayer);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
            }
        }

        public void UpdatePlevel(string email, int tid, int newlevel)
        {
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.updatePlevel", conn);
                cmd.Parameters.AddWithValue("@email", email);
                cmd.Parameters.AddWithValue("@tid", tid);
                cmd.Parameters.AddWithValue("@plevel", newlevel);
                //All level 1
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
            }          
        }

        public TournamentList GetAllTourneys(string username)
        {
            TournamentList tl = new TournamentList();
            //get list from DB
            DataTable dt = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getAllTourneys", conn);
                cmd.Parameters.AddWithValue("@username", username);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }

            foreach (DataRow dr in dt.Rows)
            {
                Tournament temp = new Tournament(dr);
                tl.Add(temp);
            }

            return tl;
        }

        public Tournament CreateNewTourney(Tournament t)
        {
            int tid = 0;
            //Checking if parameters exist before running creation of tournament
            if (!string.IsNullOrEmpty(t.tname) && t.numParticipants >= 4 && !string.IsNullOrEmpty(t.host.email))
            {
                //add to DB and return updated tournament info
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("dbo.createTourney", conn);
                    cmd.Parameters.AddWithValue("@tname", t.tname);
                    cmd.Parameters.AddWithValue("@numParticipants", t.numParticipants);
                    cmd.Parameters.AddWithValue("@hostemail", t.host.email);
                    //Set host as level 0 access
                    cmd.Parameters.AddWithValue("@type", 0);
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            tid = Convert.ToInt32(dr["tid"]);
                        }
                    }
                }
                //Add all participants based on the new tid
                string[] parts = t.commaDlParts.Split(',');
                foreach (string p in parts)
                {
                    using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
                    {
                        conn.Open();
                        SqlCommand cmd = new SqlCommand("dbo.addParticipant", conn);
                        cmd.Parameters.AddWithValue("@email", p);
                        cmd.Parameters.AddWithValue("@tid", tid);
                        //All level 2
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.ExecuteNonQuery();
                    }

                    if (p == t.host.email)
                    {
                        UpdatePlevel(p, tid, 0);
                    }
                }

                //Add matchups for this tournament
                int numMatches = t.numParticipants - 1;
                for (int i = 0; i < numMatches; i++)
                {
                    using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
                    {
                        conn.Open();
                        SqlCommand cmd = new SqlCommand("dbo.addMatchup", conn);
                        cmd.Parameters.AddWithValue("@mid", i);
                        cmd.Parameters.AddWithValue("@tid", tid);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.ExecuteNonQuery();
                    }

                }

                int count = numMatches - 1;
                int switcher = 0;

                foreach (string p in parts)
                {
                    using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
                    {
                        conn.Open();
                        SqlCommand cmd = new SqlCommand("dbo.updateMatchup", conn);
                        cmd.Parameters.AddWithValue("@mid", count);
                        cmd.Parameters.AddWithValue("@tid", tid);
                        cmd.Parameters.AddWithValue("@email", p);
                        if (switcher == 0)
                        {
                            cmd.Parameters.AddWithValue("@player", 1);
                            switcher = 1;
                        }
                        else if (switcher == 1)
                        {
                            cmd.Parameters.AddWithValue("@player", 2);
                            switcher = 0;
                            count--;
                        }
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.ExecuteNonQuery();
                    }
                }

                //foreach (string p in parts)
                //{
                //    var fromAddress = new MailAddress("tourneymakerapp@gmail.com", "TourneyMaker");
                //    var toAddress = new MailAddress(p, p);
                //    const string fromPassword = "Tourneypass123";
                //    const string subject = "You've Been Invited to Join TourneyMaker!";
                //    string body = "Hello " + p + "!\n\n" +
                //        "Your friend " + t.host.username + " at " + t.host.email + " " +
                //        "has invited you to join a Tournament on TourneyMaker!\n\n" +
                //        "Click Here to register an account.You will automatically be added into your tournament!\n\n" +
                //        "tourneymaker.cecsresearch.org\n\n" +
                //        "Good Luck, Have Fun!\n\n" +
                //        "TourneyMaker Team\n\n\n" +
                //        "Tourney Maker is an application that allows you to create, manage, and participate in tournaments!";

                //    var smtp = new SmtpClient
                //    {
                //        Host = "smtp.gmail.com",
                //        Port = 587,
                //        EnableSsl = true,
                //        DeliveryMethod = SmtpDeliveryMethod.Network,
                //        UseDefaultCredentials = false,
                //        Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                //    };
                //    var message = new MailMessage(fromAddress, toAddress);
                //    message.Subject = subject;
                //    message.Body = body;
                //    smtp.Send(message);
                //}
            }
            DataTable dt = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getTourney", conn);
                cmd.Parameters.AddWithValue("@tid", tid);
                cmd.Parameters.AddWithValue("@username", t.host.username);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            Tournament temp = new Tournament(dt.Rows[0]);

            return temp;
        }
    }

    public class Tournament
    {
        public int tid { get; set; }
        public string tname { get; set; }
        public int numParticipants { get; set; }
        public int? userPlevel { get; set; }
        public UserInfo host { get; set; }
        public List<UserInfo> managers { get; set; }
        public List<UserInfo> participants { get; set; }
        public UserManager um { get; set; }
        public MatchupList ml { get; set; }
        public RoundsList rounds { get; set; }
        public string commaDlParts { get; set; }
        public int completed { get; set; }
        public string winnername { get; set; }

        public Tournament()
        {
            host = new UserInfo();
            managers = new List<UserInfo>();
            participants = new List<UserInfo>();
            um = new UserManager();
            ml = new MatchupList();
            rounds = new RoundsList();
        }

        public Tournament(DataRow dr)
        {
            host = new UserInfo();
            managers = new List<UserInfo>();
            participants = new List<UserInfo>();
            um = new UserManager();
            ml = new MatchupList();
            rounds = new RoundsList();
            tid = dr.Field<int>("TID");
            numParticipants = dr.Field<int>("SIZE");
            tname = dr["NAME"].ToString();
            completed = dr.Field<int>("COMPLETED");
            userPlevel = dr.Field<int>("plevel");
            if(userPlevel == null)
            {
                userPlevel = 2;
            }
            SetTourneyUsers();
            GetMatchups();
            GetDisplay();
        }

        //change to getParticipant and pass back UID in userinfo
        public void SetTourneyUsers()
        {
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getHost", conn);
                cmd.Parameters.AddWithValue("@tid", tid);
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        host.password = dr["password"].ToString();
                        host.email = dr["email"].ToString();
                        host.uid = Convert.ToInt32(dr["uid"]);
                        host.username = dr["username"].ToString();
                    }
                }
            }

            DataTable dt = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getParticipants", conn);
                cmd.Parameters.AddWithValue("@tid", tid);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }

            foreach (DataRow dr in dt.Rows)
            {
                Participant temp = new Participant(dr);
                UserInfo p = new UserInfo();
                p.uid = temp.uid;
                p.email = temp.email;
                p.username = temp.username;
                p.password = temp.password;
                if (temp.plevel == 2)
                {
                    participants.Add(p);
                }
                else if(temp.plevel == 1)
                {
                    managers.Add(p);
                }
                else
                {
                    //host, already added
                }
            }
        }

        public void GetMatchups()
        {
            DataTable dt = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getMatchups", conn);
                cmd.Parameters.AddWithValue("@tid", tid);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }

            foreach (DataRow dr in dt.Rows)
            {
                Matchup temp = new Matchup(dr);
                ml.Add(temp);
                if(completed == 1 && temp.mid == 0)
                {
                    if(temp.winner == 1)
                    {
                        if (!string.IsNullOrEmpty(temp.p1user))
                        {
                            winnername = temp.p1user;
                        }
                        else
                        {
                            winnername = temp.p1email;
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(temp.p2user))
                        {
                            winnername = temp.p2user;
                        }
                        else
                        {
                            winnername = temp.p2email;
                        }
                    }               
                }
            }
        }

        public void GetDisplay()
        {
            int tracker = 1;
            int divisor = 4;
            bool go = true;
            int count = numParticipants - 2;
            DisplayList top = new DisplayList();
            DisplayList bottom = new DisplayList();
            rounds.Add(top);
            rounds.Add(bottom);
            Display d;
         
            while (go)
            {
                for (int i = 0; i < (numParticipants / divisor); i++)
                {
                    d = new Display();
                    d.matchid = ml[count].mid;
                    if (!string.IsNullOrEmpty(ml[count].p1user))
                    {
                        d.player1 = ml[count].p1user;                        
                    }
                    else if (!string.IsNullOrEmpty(ml[count].p1email))
                    {
                        d.player1 = ml[count].p1email;
                    }
                    else
                    {
                        d.player1 = ml[count].p1.ToString();
                    }
                    d.score1 = ml[count].p1score;

                    if (!string.IsNullOrEmpty(ml[count].p2user))
                    {
                        d.player2 = ml[count].p2user;
                    }
                    else if (!string.IsNullOrEmpty(ml[count].p2email))
                    {
                        d.player2 = ml[count].p2email;
                    }
                    else
                    {
                        d.player2 = ml[count].p2.ToString();
                    }
                    d.score2 = ml[count].p2score;
                    d.winner = ml[count].winner;

                    if (tracker == 1)
                    {
                        top.Add(d);
                    }
                    else
                    {
                        bottom.Add(d);                     
                    }
                    count--;
                }

                if (tracker == 2 && divisor == numParticipants)
                {
                    go = false;
                }
                if (tracker == 2 && divisor < numParticipants)
                {
                    divisor = divisor * 2;
                    tracker = 0;
                    top = new DisplayList();
                    bottom = new DisplayList();
                    rounds.Add(top);
                    rounds.Add(bottom);
                }
                tracker++;
            }
            DisplayList final = new DisplayList();
            rounds.Add(final);
            d = new Display();
            d.matchid = ml[count].mid;
            if (!string.IsNullOrEmpty(ml[count].p1user))
            {
                d.player1 = ml[count].p1user;
            }
            else if (!string.IsNullOrEmpty(ml[count].p1email))
            {
                d.player1 = ml[count].p1email;
            }
            else
            {
                d.player1 = ml[count].p1.ToString();
            }
            d.score1 = ml[count].p1score;

            if (!string.IsNullOrEmpty(ml[count].p2user))
            {
                d.player2 = ml[count].p2user;
            }
            else if (!string.IsNullOrEmpty(ml[count].p2email))
            {
                d.player2 = ml[count].p2email;
            }
            else
            {
                d.player2 = ml[count].p2.ToString();
            }
            d.score2 = ml[count].p2score;
            d.winner = ml[count].winner;
            final.Add(d);
        }
    }

    public class TournamentList : List<Tournament>
    {
        public TournamentList() { }
    }

    public class Participant
    {
        public int uid { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public int plevel { get; set; }

        public Participant() { }
        public Participant(DataRow dr)
        {
            uid = dr.Field<int>("uid");
            username = dr["username"].ToString();
            password = dr["password"].ToString();
            email = dr["email"].ToString();
            plevel = dr.Field<int>("plevel");
        }
    }

    public class Matchup
    {
        public int mid { get; set; }
        public int p1 { get; set; }
        public int p2 { get; set; }
        public string p1user { get; set; }
        public string p2user { get; set; }
        public string p1email { get; set; }
        public string p2email { get; set; }
        public int p1score { get; set; }
        public int p2score { get; set; }
        public int winner { get; set; }
        //winner will be set at 0 for not played, 1 for player 1, 2 for player 2

        public Matchup() { }
        public Matchup(DataRow dr)
        {
            mid = dr.Field<int>("mid");
            p1 = dr.Field<int>("p1");
            p2 = dr.Field<int>("p2");
            p1user = dr["p1user"].ToString() ?? "";
            p2user = dr["p2user"].ToString() ?? "";
            p1email = dr["p1email"].ToString() ?? "";
            p2email = dr["p2email"].ToString() ?? "";
            p1score = dr.Field<int>("p1score");
            p2score = dr.Field<int>("p2score");
            winner = dr.Field<int>("winner");
        }
    }

    public class MatchupList : List<Matchup>
    {
        public MatchupList() { }
    }

    public class Display
    {
        public int matchid { get; set; }
        public string player1 { get; set; }
        public string player2 { get; set; }
        public int score1 { get; set; }
        public int score2 { get; set; }
        public int winner { get; set; }
        public Display() { }
    }

    public class DisplayList : List<Display>
    {
        public DisplayList() {}
    }

    public class RoundsList : List<DisplayList>
    {
        public RoundsList() { }
    }
}