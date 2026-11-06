import { After, AfterStep, Before, setDefaultTimeout, setWorldConstructor } from "@cucumber/cucumber";
import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { PlaywrightWorld } from "./world";

setWorldConstructor(PlaywrightWorld);
setDefaultTimeout(30_000);

function safeFilePart(value: string, maxLength: number): string {
  return (
    value
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase()
      .slice(0, maxLength) || "scenario"
  );
}

Before(async function (this: PlaywrightWorld) {
  const reportsDirectory = resolve(__dirname, "../../reports");
  await mkdir(resolve(__dirname, "../../screenshots"), { recursive: true });
  await this.fixtures.setup(reportsDirectory);
  this.screenshotStepNumber = 0;
});

AfterStep(async function (this: PlaywrightWorld, { pickle, pickleStep }) {
  const screenshotDirectory = resolve(__dirname, "../../screenshots");
  await mkdir(screenshotDirectory, { recursive: true });
  this.screenshotStepNumber += 1;

  const scenarioName = safeFilePart(pickle.name, 36);
  const stepName = safeFilePart(pickleStep.text, 32);
  const stepNumber = String(this.screenshotStepNumber).padStart(3, "0");
  const pages = this.browserContext.pages().filter((page) => !page.isClosed());

  for (const [index, page] of pages.entries()) {
    const screenshot = await page.screenshot({
      path: join(
        screenshotDirectory,
        `${scenarioName}-${pickle.id.slice(0, 8)}-step-${stepNumber}-${stepName}-page-${index + 1}.png`,
      ),
    });
    await this.attach(screenshot, "image/png");
  }
});

After(async function (this: PlaywrightWorld, { pickle }) {
  const reportsDirectory = resolve(__dirname, "../../reports");
  const safeScenarioName = safeFilePart(pickle.name, 48);
  await this.fixtures.teardown(
    resolve(reportsDirectory, "traces", `${safeScenarioName}-${pickle.id}.zip`),
  );
});