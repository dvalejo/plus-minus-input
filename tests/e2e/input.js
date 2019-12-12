module.exports = {

  "Input field must be initialized with default value (10)": function (browser) {
    const defOpts = browser.globals.defaultOptions;
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value, defOpts.defaultValue);
      });
  },

  "Testing that input field value can't be less than minValue (-100)": function (browser) {
    const defOpts = browser.globals.defaultOptions;
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .setValue("@inputField", ['', [browser.Keys.CONTROL, 'a']]);
    browser.keys(browser.Keys.DELETE);
    inputCounter.setValue("@inputField", [defOpts.minValue - 1, [browser.Keys.TAB]]);

    inputCounter
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value, defOpts.minValue);
      })
  },

  "Testing that input field value can't be more than maxValue (100)": function (browser) {
    const defOpts = browser.globals.defaultOptions;
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .setValue("@inputField", ['', [browser.Keys.CONTROL, 'a']]);
    browser.keys(browser.Keys.DELETE);
    inputCounter.setValue("@inputField", [defOpts.maxValue + 1, [browser.Keys.TAB]]);

    inputCounter
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value, defOpts.maxValue);
      })
      .getAttribute("@inputField", "value", function (result) {
        this.assert.equal(result.value, defOpts.maxValue);
      });
  },

  after: function (browser) {
    browser.end();
  }
}