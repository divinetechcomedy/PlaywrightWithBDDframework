import { expect as playwrightExpect, type Locator, type Page } from "@playwright/test";

const expect = playwrightExpect.configure({ timeout: 10_000 });

export class InfiniteScrollPage {
  private simpleItemCountAtEnd = 0;

  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto("https://qaplayground.com/practice/infinite-scroll");
    await expect(this.page.getByRole("heading", { name: "Infinite Scroll Automation Practice" })).toBeVisible();
  }

  async scrollSimpleListToEnd(): Promise<void> {
    const container = this.page.getByTestId("scroll-container-simple");
    const items = container.locator('[data-testid^="item-"]');
    const initialCount = await items.count();
    const endMarker = this.page.getByTestId("end-of-list-simple");

    for (let attempt = 0; attempt < 10; attempt++) {
      if (await endMarker.isVisible()) {
        break;
      }

      await container.hover();
      await this.page.mouse.wheel(0, 600);
      await this.page.waitForTimeout(600);
    }

    expect(await items.count()).toBeGreaterThan(initialCount);
    await expect(endMarker).toBeVisible();
    this.simpleItemCountAtEnd = await items.count();
  }

  async expectSimpleListReachedEnd(): Promise<void> {
    const items = this.page.getByTestId("scroll-container-simple").locator('[data-testid^="item-"]');
    expect(await items.count()).toBeGreaterThan(5);
    await expect(this.page.getByTestId("end-of-list-simple")).toBeVisible();
  }

  async scrollSimpleListToTop(): Promise<void> {
    await this.page.getByTestId("scroll-container-simple").evaluate((element) => element.scrollTo(0, 0));
    await this.page.waitForTimeout(500);
  } 

  async expectScrollingUpDoesNotAppendItems(): Promise<void> {
    const container = this.page.getByTestId("scroll-container-simple");
    const items = container.locator('[data-testid^="item-"]');
    await expect(items).toHaveCount(this.simpleItemCountAtEnd);
  }

  async scrollToAndClickInvoice(invoiceId: string): Promise<void> {
    const container = this.page.getByTestId("scroll-container-dynamic");
    const target = this.page.locator(`[data-invoice-id="${invoiceId}"]`);

    for (let attempt = 0; attempt < 16 && (await target.count()) === 0; attempt++) {
      await this.scrollToBottom(container);
      await this.page.waitForTimeout(700);
    }

    await expect(target).toBeVisible();
    await target.getByRole("button", { name: "Action" }).click();
  }

  async expectInvoiceClicked(invoiceId: string): Promise<void> {
    await expect(this.page.getByTestId("result-s02")).toHaveText(`Clicked Invoice ${invoiceId}`);
  }

  async scrollVirtualListToRow(rowNumber: number): Promise<void> {
    const container = this.page.getByTestId("scroll-container-virtual");
    await container.evaluate((element, row) => element.scrollTo(0, (row - 1) * 40), rowNumber);
  }

  async expectVirtualizedRowVisible(rowNumber: number, removedRowNumber: number): Promise<void> {
    await expect(this.page.getByTestId(`virtual-item-${rowNumber}`)).toBeVisible();
    await expect(this.page.getByTestId(`virtual-item-${removedRowNumber}`)).toHaveCount(0);
  }

  async scrollUntilLoadMoreAppears(): Promise<void> {
    const container = this.page.getByTestId("scroll-container-challenge");
    const loadMore = this.page.getByRole("button", { name: "Load More" });

    for (let attempt = 0; attempt < 10 && !(await loadMore.isVisible()); attempt++) {
      await this.scrollToBottom(container);
      await this.page.waitForTimeout(700);
    }

    await expect(loadMore).toBeVisible();
  }

  async clickLoadMoreAndConfirmFinalItem(): Promise<void> {
    await this.page.getByRole("button", { name: "Load More" }).click();
    await expect(this.page.getByText("Secret Item 20", { exact: true })).toBeAttached();
    await this.page.getByRole("button", { name: "Confirm secret item" }).click();
  }

  async expectSecretItemFound(): Promise<void> {
    await expect(this.page.getByTestId("result-s04")).toHaveText("Found Secret Item");
  }

  private async scrollToBottom(container: Locator): Promise<void> {
    await container.evaluate((element) => element.scrollTo(0, element.scrollHeight));
  }
}