module.exports = function() {

  this.Given(/^I have visited Google$/, function () {
    browser.url('http://google.com');
  });

  this.When(/^I search for "([^"]*)"$/, function (searchTerm) {
    browser.pause(1000);
    browser.setValue('input[name="q"]', searchTerm);
    browser.pause(1000);
    browser.keys(['Enter']);
  });

  this.Then(/^I see "([^"]*)"$/, function (link) {
    browser.waitForExist('a=' + link, 2000);
    browser.pause(1000);
  });

}
