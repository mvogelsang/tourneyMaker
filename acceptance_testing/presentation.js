module.exports = function(){
       this.Given(/^I have visited the local site$/, function () {
         browser.url('http://localhost:58494/');
       });

       this.Given(/^the generic test user logs in$/, function () {
         // Write code here that turns the phrase above into concrete actions
         browser.pause(500);
         browser.click('.dropdown-toggle');
         browser.pause(500);
         browser.waitForExist('input[name=username]');
         browser.setValue('input[name=username]', 'jboss01');
         browser.pause(500);
         browser.waitForExist('input[name=password]');
         browser.setValue('input[name=password]','12341234');
         browser.pause(500);
         browser.click('button.btn.btn-primary');
         browser.pause(500);
       });

       this.Then(/^the test user should be able to view a tournament$/, function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });

       this.Then(/^the test user should be able to view a user's profile$/, function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });
}
