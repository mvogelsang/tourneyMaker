module.exports = function() {

  this.Given(/^I have visited Google$/, function () {
    browser.windowHandleMaximize(browser.windowHandle());
    browser.url('https://youtu.be/CSav51fVlKU?t=31').pause(6500);
    browser.waitForExist('.videoAdUiSkipButton');
    browser.click('.videoAdUiSkipButton').pause(5000);
    browser.newWindow("https://google.com").pause(1000);
  });

  this.When(/^I search for "([^"]*)"$/, function (searchTerm) {
    browser.setValue('input[name="q"]', searchTerm).pause();
    browser.keys(['Enter']).pause(500);
  });

  this.Then(/^I see "([^"]*)"$/, function (link) {
    browser.waitForExist('a=' + link, 2000);
    browser.pause(1000)
  });

}
