module.exports = {

  "Input field must be initialized with default value": function (browser) {
    const defOpts = browser.globals.defaultOptions;
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value, defOpts.defaultValue);
      });
  },

  "Testing that input field value can't be less than minValue or 0": function (browser) {
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .clearValue("@inputField")
      .click("@inputField");

    browser
      .keys(["-"]);

    inputCounter
      .getValue("@inputField", function (result) {
        let index = result.value.toString().indexOf("-");
        this.assert.equal(index, -1);
        this.assert.equal(result.value, 1);
      })
      .getAttribute("@inputField", "value", function (result) {
        let index = result.value.toString().indexOf("-");
        this.assert.equal(index, -1);
        this.assert.equal(result.value, 1);
      });
  },

  "Testing that input field value can't be more than maxValue or 1000": function (browser) {
    const defOpts = browser.globals.defaultOptions;
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .clearValue("@inputField")
      .click("@inputField");

    browser
      .keys(["1", "0", "0", "1"]);

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