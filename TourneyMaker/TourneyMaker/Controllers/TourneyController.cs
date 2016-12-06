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
        public string AddManagers(UserInfo _data, string _emails, int tid)
        {
            TourneyManager tm = new TourneyManager();
            tm.AddManager(_emails, tid);
            TournamentList tl = tm.GetAllTourneys(_data.username);
            return JsonConvert.SerializeObject(tl);
        }
    }
}