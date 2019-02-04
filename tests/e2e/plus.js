module.exports = {

  "Testing clicks on plus button": function (browser) {
    const pminput = browser.page.pminput();
    pminput.navigate()
      .clearValue("@inputField")
      .setValue("@inputField", 1)
      .click("@plusBtn")
      .click("@plusBtn")
      .click("@plusBtn")
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value, 4);
      })
      .getAttribute("@inputField", "value", function (result) {
        this.assert.equal(result.value, 4);
      })
  },

  "Testing hold on plus button": function (browser) {
    const pminput = browser.page.pminput();
    pminput.navigate()
      .clearValue("@inputField")
      .setValue("@inputField", 1)
      .moveToElement("@plusBtn", 0, 0);

    browser
      .mouseButtonDown("left")
      .pause(1000)
      .mouseButtonUp("left");

    pminput
      .getValue("@inputField", function (result) {
        this.assert.equal(result.value >= 10, true);
      })
      .getAttribute("@inputField", "value", function (result) {
        this.assert.equal(result.value >= 10, true);
      });
  },

  after: function (browser) {
    browser.end();
  }
}