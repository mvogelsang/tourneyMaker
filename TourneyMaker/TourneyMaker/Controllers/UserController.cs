using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TourneyMaker.Models;
using Newtonsoft.Json;

namespace TourneyMaker.Controllers
{
    public class UserController : Controller
    {
        [HttpPost]
        public string RegisterUser(UserInfo _data)
        {
            UserManager um = new UserManager();
            if(um.Register(_data.username, _data.password, _data.email))
            {
                return JsonConvert.SerializeObject(um.info);
            }
            else
            {
                UserInfo error = new UserInfo();
                return JsonConvert.SerializeObject(error);
            }
        }

        [HttpPost]
        public string LoginUser(UserInfo _data)
        {
            UserManager um = new UserManager();
            um.Login(_data.username, _data.password);
            return JsonConvert.SerializeObject(um.info);
        }

        [HttpPost]
        public string GetUser(UserInfo user)
        {
            UserManager um = new UserManager();
            UserInfo ui = um.GetUser2(user.username);
            return JsonConvert.SerializeObject(ui);
        }

        [HttpPost]
        public string GetAllTourneys(UserInfo _data)
        {
            TourneyManager tm = new TourneyManager();
            TournamentList tl = tm.GetAllTourneys(_data.username);
            return JsonConvert.SerializeObject(tl);
        }

    }
}