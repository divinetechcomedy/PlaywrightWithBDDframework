import { chromium, expect } from "@playwright/test";

async function colorGame(): Promise<void> {
    const browser = await chromium.launch({ headless: false });

    try {
        const page = await browser.newPage();
        await page.goto("https://practice.expandtesting.com/color-wheel");

        const wheel = page.locator("#picker");
        await page.getByRole("button", { name: "Play Game" }).click();
        await page.waitForTimeout(1600);

        const wheelStyle = await wheel.getAttribute("style");
        const rotationMatch = wheelStyle?.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/);
        if (!rotationMatch) {
            throw new Error("Could not read the wheel's rotation angle.");
        }

        const rotationDegrees = Number(rotationMatch[1]);
        const answers = page.locator("#answers");
        const answerButtons = answers.getByRole("button");
        const colorNames = await answerButtons.allTextContents();

        const segmentAngle = 360 / colorNames.length;
        const segmentsPastPointer = Math.ceil(((rotationDegrees + 90) % 360) / segmentAngle);
        const selectedColor = colorNames[colorNames.length - segmentsPastPointer];
        if (!selectedColor) {
            throw new Error(`Could not identify the color at rotation ${rotationDegrees} degrees.`);
        }

        console.log(`The pointer indicates ${selectedColor}.`);
        await answers.getByRole("button", {
            name: new RegExp(`^${selectedColor}$`, "i"),
        }).click();
        await expect(page.locator("#result")).toBeEmpty();
        console.log("The game accepted the answer.");
    } finally {
        await browser.close();
    }
}

colorGame().catch((error: unknown) => {
    console.error("Error:", error);
    process.exitCode = 1;
});