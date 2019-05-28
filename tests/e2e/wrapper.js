module.exports = {
  "Testing that all html elements are created...": function (browser) {
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .assert.elementPresent("@wrapper")
      .assert.elementPresent("@minusBtn")
      .assert.elementPresent("@inputField")
      .assert.elementPresent("@plusBtn")
    browser.end();
  },
};