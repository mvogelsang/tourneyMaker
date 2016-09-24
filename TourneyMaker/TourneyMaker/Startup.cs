using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TourneyMaker.Startup))]
namespace TourneyMaker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
