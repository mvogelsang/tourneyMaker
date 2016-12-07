module.exports = function() {

  this.Given(/^I have visited Google$/, function () {
    browser.windowHandleMaximize(browser.windowHandle());
    browser.pause()
    browser.url('https://youtu.be/CSav51fVlKU?t=31').pause(7200);
    if(browser.isExisting('.videoAdUiSkipButton')){
      browser.waitForExist('.videoAdUiSkipButton');
      browser.click('.videoAdUiSkipButton').pause(2000);
    }
    browser.pause(2000);
    browser.newWindow("https://google.com", "new");
    browser.windowHandleMaximize(browser.windowHandle());
  });

  this.When(/^I search for "([^"]*)"$/, function (searchTerm) {
    browser.pause(1000)
    browser.setValue('input[name="q"]', searchTerm).pause();
    browser.keys(['Enter']).pause(500);
  });

  this.Then(/^I see "([^"]*)"$/, function (link) {
    browser.waitForExist('a=' + link, 2000);
    browser.pause(1000)
  });

}
