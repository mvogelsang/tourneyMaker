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
      // Write code here that turns the phrase above into concrete actions
      return 'pending';
    });

    this.When(/^navigate to the profile page$/, function () {
       browser.pause();
       browser.waitForExist('#user-email-input');
       browser.pause();
     });

   this.Then(/^I should see my bio "([^"]*)", and be able to change it to "([^"]*)"$/, function (arg1, arg2) {
      // Write code here that turns the phrase above into concrete actions
      return 'pending';
    });


}
