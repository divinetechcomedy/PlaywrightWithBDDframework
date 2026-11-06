import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";

async function dropdownTypes(): Promise<void> {
    const screenshotsDirectory = resolve(__dirname, "..", "screenshots");
    await mkdir(screenshotsDirectory, { recursive: true });
    const browser = await chromium.launch({ headless: false });

    try {
        const page = await browser.newPage();
        await page.goto("https://demo.testautomationtv.com/lists-dropdowns");
        await page.screenshot({ path: join(screenshotsDirectory, "home.png") });
        await page.screenshot({
            path: join(screenshotsDirectory, "home-full.png"),
            fullPage: true,
        });
        const city = page.getByLabel("Search and select a city");
        await city.fill("Tokyo");
        await expect(city).toHaveValue("Tokyo");
        console.log("Datalist input:", await city.inputValue());
        await page.getByLabel("Search and select a city")
            .screenshot({ path: join(screenshotsDirectory, "submit-button.png") });
        const color = page.getByLabel("Favorite Color");
        await color.selectOption("blue");
        await expect(color).toHaveValue("blue");
        console.log("Single-select value:", await color.inputValue());

        const languages = page.getByLabel("Programming Languages");
        await languages.selectOption(["python", "typescript"]);
        await expect(languages).toHaveValues(["python", "typescript"]);
        console.log("Multi-select values:", await languages.locator("option:checked").allTextContents());

        const country = page.locator("#country-trigger");
        await country.click();
        await page.getByRole("option", { name: "India", exact: true }).click();
        await expect(page.getByTestId("country-selected-value")).toHaveText("India");
        console.log("Custom dropdown value:", await page.getByTestId("country-selected-value").innerText());

        console.log("Dropdown examples passed.");
    } finally {
        await browser.close();
    }
}

dropdownTypes().catch((error: unknown) => {
    console.error("Error:", error);
    process.exitCode = 1;
});
