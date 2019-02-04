module.exports = {

  "Testing clicks on minus button": function (browser) {
    const pminput = browser.page.pminput();
    pminput.navigate()
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

  "Testing hold on minus button": function (browser) {
    const pminput = browser.page.pminput();
    pminput.navigate()
      .clearValue("@inputField")
      .setValue("@inputField", 25)
      .moveToElement("@minusBtn", 0, 0);

    browser
      .mouseButtonDown("left")
      .pause(1000)
      .mouseButtonUp("left");

    pminput
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value <= 15, true);
      })
      .getAttribute("@inputField", "value", function (result) {
        this.assert.equal(result.value <= 15, true);
      })
  },

  after: function (browser) {
    browser.end();
  }
}