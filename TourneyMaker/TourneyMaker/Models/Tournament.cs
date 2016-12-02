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
                //CreateNewTourey
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

        public Tournament CreateNewTourey(Tournament t)
        {
            
            //add to DB and return updated tournament info
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.createTourney", conn);
                cmd.Parameters.AddWithValue("@tname", t.tname);
                cmd.Parameters.AddWithValue("@numParticipants", t.numParticipants);
                cmd.Parameters.AddWithValue("@hostname", t.host.username);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
            }

            return t;
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
        private string temphost = "";
        private string tempmanagers = "";
        private string tempparticipants = "";

        public Tournament()
        {
            um = new UserManager();
        }

        public Tournament(DataRow dr)
        {
            um = new UserManager();
            tid = dr.Field<int>("tid");
            tname = dr["name"].ToString();
            numParticipants = dr.Field<int>("numParticipants");
            temphost = dr["host"].ToString();
            tempmanagers = dr["managers"].ToString();
            tempparticipants = dr["participants"].ToString();
        }

        public void SetTourneyUsers()
        {
            host = um.GetUser(temphost);
            string[] tm = tempmanagers.Split(',');
            string[] tp = tempparticipants.Split(',');
            if(tm.Length > 0)
            {
                foreach(string m in tm)
                {
                    managers.Add(um.GetUser(m));
                }
            }
            if (tp.Length > 0)
            {
                foreach (string p in tp)
                {
                    participants.Add(um.GetUser(p));
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

    }

    public class TournamentList : List<Tournament>
    {
        public TournamentList() { }
    }

    public class Matchup
    {
        int mid { get; set; }
        string player1 { get; set; }
        string player2 { get; set; }
        int winner { get; set; }
        //winner will be set at 0 for not played, 1 for player 1, 2 for player 2

        public Matchup() { }
        public Matchup(DataRow dr)
        {
            mid = dr.Field<int>("mid");
            player1 = dr["player1"].ToString();
            player2 = dr["player2"].ToString();
            winner = dr.Field<int>("winner");
        }
    }

    public class MatchupList : List<Matchup>
    {
        public MatchupList() { }
    }

    public class Display
    {

    }

    public class DisplayList : List<Display>
    {

    }

}