module.exports = function() {
  this.Given(/^I am at the site$/, function () {
     browser.url("http://localhost:58494/").pause(1000);
     if(browser.isExisting('#logout-link')){
       browser.click('#logout-link').pause();
     }
     browser.pause();
   });

   this.When(/^I log in as "([^"]*)" with password "([^"]*)"$/, function (arg1, arg2) {
     browser.click('a.dropdown-toggle').pause();
     browser.setValue('#login-username-input', arg1).pause();
     browser.setValue('#login-password-input', arg2).pause();
     browser.click('#login-button').pause(1500);
     browser.waitForExist('#logout-link',1000)
   });

   this.Then(/^I should be taken to a page with "([^"]*)" on it$/, function (arg1) {
      browser.pause();
      expect(browser.getText('.navbar-nav li:nth-child(1)')).to.contain(arg1);
      browser.pause();
    });

    this.Then(/^I should be able to log out$/, function () {
      browser.pause();
      browser.click('#logout-link').pause();
      browser.pause();
     });

   this.When(/^I should see my new username if I register$/, function () {
     var uname = makeid();
     var email = makeid() + '@' + makeid() + '.com';
     var pass = makeid();

     browser.pause();
     browser.setValue("#reg-username-input", uname).pause();
     browser.setValue("#reg-email-input", email).pause();
     browser.setValue("#reg-password1-input", pass).pause();
     browser.setValue("#reg-password2-input", pass).pause();
     browser.click('#create-account-button').pause(1000);
     browser.pause();
     expect(browser.getText('.navbar-nav li:nth-child(1)')).to.contain(uname);
     browser.pause();

    });

    this.When(/^navigate to the profile page$/, function () {
       browser.pause();
       browser.click("#profile-link").pause();
       browser.waitForExist('#user-email-input');
       browser.pause();
     });

   this.Then(/^I should see my bio "([^"]*)", and be able to change it to "([^"]*)"$/, function (arg1, arg2) {
      browser.pause();
      expect(browser.getValue("#user-bio-input")).to.be.equal(arg1);
      browser.pause();
      browser.setValue("#user-bio-input", arg2).pause(1000);
      browser.click("#user-save-button").pause(2500);
      browser.setValue("#user-bio-input", "").pause(1000);
      browser.refresh();
      browser.waitForExist("#user-bio-input");
      browser.pause(1200);
      browser.waitForValue("#user-bio-input");
      expect(browser.getValue("#user-bio-input")).to.be.equal(arg2);
      browser.pause();

    });

    function makeid(){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 12; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
}
