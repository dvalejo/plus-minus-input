module.exports = {
  "Testing clicks on minus button": function (browser) {
    const defOpts = browser.globals.defaultOptions;
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .pause(100)
      .click("@minusBtn")
      .click("@minusBtn")
      .click("@minusBtn")
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value, defOpts.defaultValue - defOpts.increment * 3);
      });
  },
  after: function (browser) {
    browser.end();
  }
}