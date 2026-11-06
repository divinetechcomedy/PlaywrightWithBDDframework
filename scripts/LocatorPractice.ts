import { chromium, expect } from "@playwright/test";
async function locatorPractice(): Promise<void> {

    const browser = await chromium.launch({ headless: false });
    try {
        const page = await browser.newPage();
        await page.goto("https://practice.expandtesting.com/locators");

        await expect(page.getByRole("heading", { name: "Locators Test page for Automation" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Add Item" })).toBeVisible();
        await expect(page.getByText("Hot Deal: Buy 1 Get 1")).toBeVisible();

        const country = page.getByLabel("Choose a country");
        const countryOptions = await country.locator("option").allTextContents();
        console.log("Country options:", countryOptions.map((option) => option.trim()));
        await country.selectOption({ label: "Japan" });
        await expect(country).toHaveValue("Japan");

        const email = page.getByLabel("Email for");
        await email.fill("tester@example.com");
        await expect(email).toHaveValue("tester@example.com");

        const search = page.getByPlaceholder("the site");
        await search.fill("Playwright");
        await expect(search).toHaveValue("Playwright");

        await expect(page.getByAltText("avatar")).toBeVisible();
        await expect(page.getByTitle("Refresh content")).toBeVisible();
        await expect(page.getByTestId("user-name")).toContainText("Alice");
        await expect(page.locator(".legacy-css")).toHaveText("This is a legacy CSS target");
        //put pause of 5 seconds 
        await page.waitForTimeout(500);


        console.log("The recommended locator examples passed.");
    } finally {

        await browser.close();
    }

}

locatorPractice().catch((error: unknown) => {
    console.error("Error:", error);
    process.exitCode = 1;
});