module.exports = {
  "Testing that all html elements are created...": function (browser) {
    const pminput = browser.page.pminput();
    pminput.navigate()
      .assert.elementPresent("@wrapper")
      .assert.elementPresent("@minusBtn")
      .assert.elementPresent("@inputField")
      .assert.elementPresent("@plusBtn")
    browser.end();
  },
};