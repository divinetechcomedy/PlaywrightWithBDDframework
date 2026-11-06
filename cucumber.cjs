const fs = require("node:fs");
const path = require("node:path");

const reportsDirectory = path.resolve(__dirname, "reports");
fs.mkdirSync(reportsDirectory, { recursive: true });

module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["features/support/**/*.ts", "features/step-definitions/**/*.ts"],
    format: [
      "progress",
      "html:reports/cucumber.html",
      "json:reports/cucumber.json",
      "junit:reports/cucumber.xml"
    ]
  }
};