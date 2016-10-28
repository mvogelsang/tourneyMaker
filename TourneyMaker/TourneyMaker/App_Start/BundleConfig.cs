using System.Web;
using System.Web.Optimization;

namespace TourneyMaker
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-messages.js",
                "~/Scripts/angular-ui/ui-bootstrap.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                //This is where we will place all of our own angular files, note: add the js file generated from typescript
                "~/app/app.module.js",
                "~/app/app.routing.js",

                //controllers
                "~/app/landing-page/landing-page.controller.js",
                "~/app/home/home.controller.js",
                "~/app/dashboard/dashboard.controller.js",
                "~/app/dashboard/active-tournaments/active-tournaments.controller.js",
                "~/app/dashboard/completed-tournaments/completed-tournaments.controller.js",
                "~/app/dashboard/profile/profile.controller.js",
                "~/app/dashboard/tournament-management/tournament-management.controller.js",
                "~/app/dashboard/create-tournament/create-tournament.controller.js",
                "~/app/dashboard/view-tournament/view-tournament.controller.js",
                "~/app/public-profile/public-profile.controller.js",

                //services
                "~/app/services/bracket.service.js",
                "~/app/services/user.service.js"
                ));


            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/brackets.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/admin-lte/js/app.js",
                      "~/Scripts/respond.js"));

            //Any specific css you would like to add should go after app.css
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      //"~/Content/bootstrap.slate.css",
                      "~/admin-lte/css/AdminLTE.css",
                      "~/admin-lte/css/skins/skin-blue.css",
                      "~/Content/font-awesome.min.css",
                      "~/Content/app.css"
                      ));
        }
    }
}
