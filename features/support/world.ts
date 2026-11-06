import { World, type IWorldOptions } from "@cucumber/cucumber";
import type { BrowserContext, Page } from "@playwright/test";
import { PlaywrightFixtures } from "./fixtures";

export class PlaywrightWorld extends World {
  readonly testName: string;
  readonly testEmail: string;
  readonly testPassword: string;
  readonly fixtures: PlaywrightFixtures;
  screenshotStepNumber = 0;

  constructor(options: IWorldOptions) {
    super(options);
    this.fixtures = new PlaywrightFixtures();
    this.testName = process.env.TEST_NAME ?? "Ashish";
    this.testEmail = process.env.TEST_EMAIL ?? `ashishbdd${Date.now()}@yopmail.com`;
    this.testPassword = process.env.TEST_PASSWORD ?? "Test@1234";
  }

  get page(): Page {
    return this.fixtures.currentPage;
  }

  get browserContext(): BrowserContext {
    return this.fixtures.browserContext;
  }

  get qaPlayground() {
    return this.fixtures.qaPlayground;
  }

  get infiniteScrollPage() {
    return this.fixtures.infiniteScrollPage;
  }

  get yopmail() {
    return this.fixtures.yopmail;
  }
}