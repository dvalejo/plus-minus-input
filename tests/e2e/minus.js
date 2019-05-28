module.exports = {

  "Testing clicks on minus button": function (browser) {
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .clearValue("@inputField")
      .setValue("@inputField", 25)
      .click("@minusBtn")
      .click("@minusBtn")
      .click("@minusBtn")
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value, 22);
      })
      .getAttribute("@inputField", "value", function (result) {
        this.assert.equal(result.value, 22);
      });
  },

  after: function (browser) {
    browser.end();
  }
}