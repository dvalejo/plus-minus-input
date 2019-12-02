module.exports = {
  "Testing clicks on plus button": function (browser) {
    const inputCounter = browser.page.inputCounter();
    inputCounter.navigate()
      .clearValue("@inputField")
      .setValue("@inputField", 1)
      .click("@plusBtn")
      .click("@plusBtn")
      .click("@plusBtn")
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value, 16);
      })
      .getAttribute("@inputField", "value", function (result) {
        this.assert.equal(result.value, 16);
      })
  },
  after: function (browser) {
    browser.end();
  }
}