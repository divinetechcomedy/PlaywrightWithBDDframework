import { chromium, expect } from "@playwright/test";

async function run143(): Promise<void> {
    const browser123 = await chromium.launch({ headless: false });


    try {

        const page567 = await browser123.newPage();
        await page567.goto("https://practice.expandtesting.com/tables");

        const table987 = page567.locator('xpath=//*[@id="table2"]');
        console.log(table987);
        const rows129 = table987.locator("tbody").getByRole("row");
        console.log(rows129);
        const expectedDueAmounts: string[] = ["$50.00", "$51.00", "$100.00", "$50.00"];
        const headers130 = await table987.getByRole("columnheader").allInnerTexts();
        console.log(headers130.length);
        const dueColumnIndex1 = headers130.findIndex((Due) => Due.trim() === "Due");
        console.log(dueColumnIndex1);
        const actualDueAmounts: string[] = [];
        const actualFirstNames: string[] = [];

        if (dueColumnIndex1 === -1) {
            throw new Error('Could not find the "Due" column.');
        }

        const rowCount3 = await rows129.count();
        for (let rowIndex = 0; rowIndex < rowCount3; rowIndex++) {
            const cellTexts5 = await rows129.nth(rowIndex).getByRole("cell").allInnerTexts();


            actualDueAmounts.push(cellTexts5[dueColumnIndex1].trim());



            console.log(`Row ${rowIndex + 1}:`);
            cellTexts5.forEach((cellText5, cellIndex7) => {
                console.log(`  Cell ${cellIndex7 + 1}: ${cellText5}`);
            })
            cellTexts5.forEach((cellText5) => {
                console.log(cellText5);
            });;
        }
        console.log(actualFirstNames);
        expect(actualDueAmounts).toEqual(expectedDueAmounts);
        console.log("Due amounts match expected values.");
    } finally {
        await browser123.close();
    }
}

run143().catch((error: unknown) => {
    console.error("Error:", error);
    process.exitCode = 1;
});