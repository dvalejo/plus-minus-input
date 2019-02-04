const chromedriver = require("chromedriver");

module.exports = {
  src_folders: ["tests/e2e/"],
  page_objects_path: ["./tests/pages/"],
  globals_path: "./tests/globals.js",
  test_workers: {
    enabled: true,
    workers: "auto"
  },
  webdriver: {
    start_process: true,
    server_path: chromedriver.path,
    port: 9515
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome"
      }
    }
  }
}