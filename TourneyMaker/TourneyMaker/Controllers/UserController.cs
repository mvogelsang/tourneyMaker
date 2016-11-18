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
        // GET: User
        public string RegisterUser(string _data)
        {
            UserManager um = new UserManager();
            UserInfo data = JsonConvert.DeserializeObject<UserInfo>(_data);
            if (um.Register(data.username, data.password, data.email))
            {
                return JsonConvert.SerializeObject(um);
            }
            else
            {
                return "error";
            }
        }

        public string LoginUser(string _data)
        {
            UserManager um = new UserManager();
            UserInfo data = JsonConvert.DeserializeObject<UserInfo>(_data);
            um.Login(data.username, data.password);
            return JsonConvert.SerializeObject(um);
        }

    }
}