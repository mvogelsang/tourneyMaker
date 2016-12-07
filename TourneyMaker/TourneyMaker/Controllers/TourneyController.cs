using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TourneyMaker.Models;
using Newtonsoft.Json;

namespace TourneyMaker.Controllers
{
    public class TourneyController : Controller
    {

        [HttpPost]
        public string NewTourney(UserInfo _data, Tournament _t)
        {
            //_t needs the following:
            //tname, name of tournament
            //numParticipants, # of participants
            //host.email, _data.email
            //commaDlParts, comma delineated string of participant emails (no spaces or other characters)
            TourneyManager tm = new TourneyManager();
            _t.host.email = _data.email;
            Tournament t = tm.CreateNewTourney(_t);
            return JsonConvert.SerializeObject(t);
        }

        [HttpPost]
        public string GetTourney(UserInfo _data, TourneyInt _t)
        {
            TourneyManager tm = new TourneyManager();
            Tournament t = tm.GetTournament(_data.username, _t.tid);
            return JsonConvert.SerializeObject(t);
        }

        [HttpPost]
        public void UpdateMatchup(Matchup match, TourneyInt _t)
        {
            TourneyManager tm = new TourneyManager();
            tm.UpdateMatchup(match, _t.tid);
        }

        [HttpPost]
        public void AddManager(UserInfo _data, TourneyInt _t)
        {
            TourneyManager tm = new TourneyManager();
            tm.UpdatePlevel(_data.email, _t.tid, 1);
        }

        public class TourneyInt
        {
            public int tid { get; set; }
            public TourneyInt() { }
        }
    }
}