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

        public void AddManager(string emails)
        {
            string[] ems = emails.Split(',');
            foreach (string e in ems)
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("dbo.updateManager", conn);
                    cmd.Parameters.AddWithValue("@email", e);
                    //All level 1
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public TournamentList GetAllTourneys(string email)
        {
            TournamentList tl = new TournamentList();
            //get list from DB
            DataTable dt = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.getAllTourneys", conn);
                cmd.Parameters.AddWithValue("@email", email);
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
            
            //add to DB and return updated tournament info
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("dbo.createTourney", conn);
                cmd.Parameters.AddWithValue("@tname", t.tname);
                cmd.Parameters.AddWithValue("@numParticipants", t.numParticipants);
                cmd.Parameters.AddWithValue("@hostname", t.host.username);
                //Set host as level 0 access
                cmd.Parameters.AddWithValue("@type", 0);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
            }

            string[] parts = t.commaDlParts.Split(',');
            foreach(string p in parts)
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["localConnection"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("dbo.addParticipant", conn);
                    cmd.Parameters.AddWithValue("@email", p);
                    //All level 2
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }
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
        public RoundsList rounds { get; set; }
        public string commaDlParts { get; set; }
        private string temphost = "";
        private string tempmanagers = "";
        private string tempparticipants = "";

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
            tid = dr.Field<int>("tid");
            tname = dr["name"].ToString();
            numParticipants = dr.Field<int>("numParticipants");
            temphost = dr["host"].ToString();
            tempmanagers = dr["managers"].ToString();
            tempparticipants = dr["participants"].ToString();
            SetTourneyUsers();
            GetMatchups();
            GetDisplay();
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

        public void GetDisplay()
        {
            int tracker = 1;
            int divisor = 4;
            bool go = true;
            int count = ml.Count - 1;
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
                    if(tracker == 1)
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
                if (tracker == 2 && divisor < numParticipants)
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

    public class Matchup
    {
        public int mid { get; set; }
        public string player1 { get; set; }
        public string player2 { get; set; }
        public int winner { get; set; }
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