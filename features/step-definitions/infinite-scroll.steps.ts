import { Given, Then, When } from "@cucumber/cucumber";
import { PlaywrightWorld } from "../support/world";

Given("I open the Infinite Scroll practice page", async function (this: PlaywrightWorld) {
  await this.infiniteScrollPage.open();
});

When("I scroll the simple list to the end", async function (this: PlaywrightWorld) {
  await this.infiniteScrollPage.scrollSimpleListToEnd();
});

Then("the simple list has appended items and shows the end marker", async function (this: PlaywrightWorld) {
  await this.infiniteScrollPage.expectSimpleListReachedEnd();
});

When("I scroll back to the top of the simple list", async function (this: PlaywrightWorld) {
  await this.infiniteScrollPage.scrollSimpleListToTop();
});

Then("scrolling up does not append another batch", async function (this: PlaywrightWorld) {
  await this.infiniteScrollPage.expectScrollingUpDoesNotAppendItems();
});

When("I scroll to invoice {string} and click its action", async function (this: PlaywrightWorld, invoiceId: string) {
  await this.infiniteScrollPage.scrollToAndClickInvoice(invoiceId);
});

Then("invoice {string} is confirmed as clicked", async function (this: PlaywrightWorld, invoiceId: string) {
  await this.infiniteScrollPage.expectInvoiceClicked(invoiceId);
});

When("I scroll the virtualized list to row {int}", async function (this: PlaywrightWorld, rowNumber: number) {
  await this.infiniteScrollPage.scrollVirtualListToRow(rowNumber);
});

Then(
  "row {int} is visible and row {int} is removed from the DOM",
  async function (this: PlaywrightWorld, rowNumber: number, removedRowNumber: number) {
    await this.infiniteScrollPage.expectVirtualizedRowVisible(rowNumber, removedRowNumber);
  }
);

When("I scroll the secret list until Load More appears", async function (this: PlaywrightWorld) {
  await this.infiniteScrollPage.scrollUntilLoadMoreAppears();
});

When("I click Load More and confirm the final item", async function (this: PlaywrightWorld) {
  await this.infiniteScrollPage.clickLoadMoreAndConfirmFinalItem();
});

Then("the secret item is found", async function (this: PlaywrightWorld) {
  await this.infiniteScrollPage.expectSecretItemFound();
});