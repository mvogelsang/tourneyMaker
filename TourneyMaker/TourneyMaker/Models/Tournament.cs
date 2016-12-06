using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace TourneyMaker.Models
{

    public class TourneyManager
    {
        public TourneyManager()
        {
            //Functions
            //GetAllTourneys
            //CreateNewTourney
        }

        public Tournament GetTournament(int tid)
        {
            DataTable dt = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getTourney", conn);
                cmd.Parameters.AddWithValue("@tid", tid);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            Tournament temp = new Tournament(dt.Rows[0]);

            return temp;
        }

        public void UpdateMatchup(int tid, int mid, int player1score, int player2score, int winner)
        {
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.updateMatchup", conn);
                cmd.Parameters.AddWithValue("@tid", tid);
                cmd.Parameters.AddWithValue("@mid", mid);
                cmd.Parameters.AddWithValue("@player1score", player1score);
                cmd.Parameters.AddWithValue("@player2score", player2score);
                cmd.Parameters.AddWithValue("@winner", winner);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
            }
        }

        public void AddManager(string emails, int tid)
        {
            string[] ems = emails.Split(',');
            foreach (string e in ems)
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("dbo.updateManager", conn);
                    cmd.Parameters.AddWithValue("@email", e);
                    cmd.Parameters.AddWithValue("@tid", tid);
                    //All level 1
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }
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

            DataTable dt = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getTourney", conn);
                cmd.Parameters.AddWithValue("@tid", tid);
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
        public UserInfo host { get; set; }
        public List<UserInfo> managers { get; set; }
        public List<UserInfo> participants { get; set; }
        public UserManager um { get; set; }
        public MatchupList ml { get; set; }
        public RoundsList rounds { get; set; }
        public string commaDlParts { get; set; }
        public int completed { get; set; }

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
            }
        }

        public void GetDisplay()
        {
            int tracker = 1;
            int divisor = 4;
            bool go = true;
            int count = numParticipants - 2;
            PositionList pl = new PositionList();
            Position top = new Position(1);
            Position bottom = new Position(2);
            pl.Add(top);
            pl.Add(bottom);
            rounds.Add(pl);
            Display d;
         
            while (go)
            {
                for (int i = 0; i < (numParticipants / divisor); i++)
                {
                    d = new Display();
                    d.matchid = ml[count].mid;
                    d.player1 = ml[count].player1;
                    d.player2 = ml[count].player2;
                    if (tracker == 1)
                    {
                        top.dl.Add(d);
                    }
                    else
                    {
                        bottom.dl.Add(d);                     
                    }
                    count--;
                }

                if (tracker == 2 && divisor == numParticipants)
                {
                    go = false;
                }
                else if (tracker == 2 && divisor < numParticipants)
                {
                    divisor = divisor * 2;
                    tracker = 0;
                    pl = new PositionList();
                    top = new Position(1);
                    bottom = new Position(2);
                    pl.Add(top);
                    pl.Add(bottom);
                    rounds.Add(pl);
                }
                else
                {
                    go = false;
                }
                tracker++;
            }
            //add final info to list for final matchup
            pl = new PositionList();
            Position final = new Position(0);
            pl.Add(final);
            rounds.Add(pl);
            d = new Display();
            d.matchid = ml[count].mid;
            d.player1 = ml[count].player1;
            d.player2 = ml[count].player2;
            final.dl.Add(d);
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
        public string player1 { get; set; }
        public string player2 { get; set; }
        public int p1score { get; set; }
        public int p2score { get; set; }
        public int winner { get; set; }
        //winner will be set at 0 for not played, 1 for player 1, 2 for player 2

        public Matchup() { }
        public Matchup(DataRow dr)
        {
            mid = dr.Field<int>("mid");
            player1 = dr["p1"].ToString();
            player2 = dr["p2"].ToString();
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
        public Display() { }
    }

    public class DisplayList : List<Display>
    {
        public DisplayList() { }
    }

    public class Position
    {
        public DisplayList dl;
        public string pos { get; set; }
        public Position(int track)
        {
            dl = new DisplayList();
            if(track == 1)
            {
                pos = "top";
            }
            else if(track == 2)
            {
                pos = "bottom";
            }
            else
            {
                pos = "final";
            }
        }
    }

    public class PositionList : List<Position>
    {
        public PositionList() { }
    }

    public class RoundsList : List<PositionList>
    {
        public RoundsList() { }
    }
}