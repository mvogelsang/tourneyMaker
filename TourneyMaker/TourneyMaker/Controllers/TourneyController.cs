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
        public string GetTourneyInfo(UserInfo _data)
        {
            TourneyManager tm = new TourneyManager();
            TournamentList tl = tm.GetAllTourneys(_data.email);
            return JsonConvert.SerializeObject(tl);
        }

        [HttpPost]
        public string NewTourney(UserInfo _data, Tournament _t)
        {
            TourneyManager tm = new TourneyManager();
            Tournament t = tm.CreateNewTourney(_t);
            TournamentList tl = tm.GetAllTourneys(_data.email);
            return JsonConvert.SerializeObject(tl);
        }

    }
}