import { chromium, type Browser, type BrowserContext, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { InfiniteScrollPage } from "../../src/pages/infinite-scroll.page";
import { QaPlaygroundPage } from "../../src/pages/qa-playground.page";
import { YopmailPage } from "../../src/pages/yopmail.page";

export class PlaywrightFixtures {
  private browser?: Browser;
  private context?: BrowserContext;
  private page?: Page;
  private traceStarted = false;
  private app?: QaPlaygroundPage;
  private infiniteScroll?: InfiniteScrollPage;
  private mail?: YopmailPage;

  async setup(reportsDirectory: string): Promise<void> {
    await mkdir(join(reportsDirectory, "videos"), { recursive: true });
    await mkdir(join(reportsDirectory, "traces"), { recursive: true });

    this.browser = await chromium.launch({ headless: process.env.HEADLESS !== "false" });
    this.context = await this.browser.newContext({
      recordVideo: { dir: join(reportsDirectory, "videos") },
    });
    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
    this.traceStarted = true;
    this.page = await this.context.newPage();
    this.app = new QaPlaygroundPage(this.page);
    this.infiniteScroll = new InfiniteScrollPage(this.page);
    this.mail = new YopmailPage();
  }

  async teardown(tracePath: string): Promise<void> {
    const context = this.context;
    const browser = this.browser;

    try {
      if (context && this.traceStarted) {
        await context.tracing.stop({ path: tracePath });
        this.traceStarted = false;
      }
    } finally {
      try {
        await context?.close();
      } finally {
        await browser?.close();
        this.context = undefined;
        this.browser = undefined;
        this.page = undefined;
        this.app = undefined;
        this.infiniteScroll = undefined;
        this.mail = undefined;
      }
    }
  }

  get browserContext(): BrowserContext {
    if (!this.context) {
      throw new Error("The browser context fixture has not been initialized");
    }
    return this.context;
  }

  get currentPage(): Page {
    if (!this.page) {
      throw new Error("The page fixture has not been initialized");
    }
    return this.page;
  }

  get qaPlayground(): QaPlaygroundPage {
    if (!this.app) {
      throw new Error("The QA Playground page fixture has not been initialized");
    }
    return this.app;
  }

  get infiniteScrollPage(): InfiniteScrollPage {
    if (!this.infiniteScroll) {
      throw new Error("The infinite scroll page fixture has not been initialized");
    }
    return this.infiniteScroll;
  }

  get yopmail(): YopmailPage {
    if (!this.mail) {
      throw new Error("The Yopmail page fixture has not been initialized");
    }
    return this.mail;
  }
}
