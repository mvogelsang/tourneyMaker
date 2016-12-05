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
        // GET: User
        public string RegisterUser(UserInfo _data)
        {
            UserManager um = new UserManager();
            //UserInfo data = JsonConvert.DeserializeObject<UserInfo>(_data);
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
            //UserInfo data = JsonConvert.DeserializeObject<UserInfo>(_data);
            um.Login(_data.username, _data.password);
            return JsonConvert.SerializeObject(um.info);
        }

        [HttpPost]
        public string GetUser(UserInfo user)
        {
            UserManager um = new UserManager();
            //UserInfo user = JsonConvert.DeserializeObject<UserInfo>(data);
            UserInfo ui = um.GetUser2(user.username);
            return JsonConvert.SerializeObject(ui);
        }

    }
}