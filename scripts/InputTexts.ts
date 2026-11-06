import { chromium, expect } from "@playwright/test";
async function main(): Promise<void> {
    const browser = await chromium.launch({ headless: false });

    try {
        const page = await browser.newPage();
        await page.goto("https://practice.expandtesting.com/inputs");

        await page.getByLabel("Input: Number").fill("123");
        await page.getByLabel("Input: Text").fill("Hello, Playwright!");
        await page.getByLabel("Input: Password").fill("secret123");
        await page.getByLabel("Input: Date").fill("2023-10-01");

        await page.getByRole("button", { name: "Display Inputs" }).click();

        await expect(page.locator("#output-number")).toHaveText("123");
        await expect(page.locator("#output-text")).toHaveText("Hello, Playwright!");
        await expect(page.locator("#output-password")).toHaveText("secret123");
        await expect(page.locator("#output-date")).toHaveText("2023-10-01");

        console.log("All input values were displayed successfully.");
    } finally {
        await browser.close();
    }
}

main().catch((error: unknown) => {
    console.error("Error:", error);
    process.exitCode = 1;
});