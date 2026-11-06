import { expect, type BrowserContext, type Page } from "@playwright/test";

export class YopmailPage {
  private page?: Page;

  async verifyAddress(context: BrowserContext, email: string): Promise<Page> {
    this.page = await context.newPage();
    await this.page.goto("https://yopmail.com/", { waitUntil: "domcontentloaded" });
    await this.page.getByRole("textbox", { name: "Login" }).fill(email);
    await this.page.getByTitle("Check Inbox @yopmail.com").click();

    const verificationLink = this.page
      .locator('iframe[name="ifmail"]')
      .contentFrame()
      .getByRole("link", { name: "Verify email address" });
    await expect(verificationLink).toBeVisible({ timeout: 10_000 });

    const [verificationPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      verificationLink.click()
    ]);
    await verificationPage.waitForLoadState("domcontentloaded");
    return verificationPage;
  }
}