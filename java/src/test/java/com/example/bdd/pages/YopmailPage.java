package com.example.bdd.pages;

import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;

public class YopmailPage {
    public Page verifyAddress(BrowserContext context, String email) {
        Page mailPage = context.newPage();
        mailPage.setDefaultTimeout(10_000);
        mailPage.navigate("https://yopmail.com/", new Page.NavigateOptions().setWaitUntil(
                com.microsoft.playwright.options.WaitUntilState.DOMCONTENTLOADED));
        mailPage.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Login")).fill(email);
        mailPage.getByTitle("Check Inbox @yopmail.com").click();

        Locator verificationLink = mailPage.frameLocator("iframe[name=\"ifmail\"]")
                .getByRole(AriaRole.LINK, new com.microsoft.playwright.FrameLocator.GetByRoleOptions()
                        .setName("Verify email address"));
        verificationLink.waitFor(new Locator.WaitForOptions().setState(
                com.microsoft.playwright.options.WaitForSelectorState.VISIBLE));

        Page verificationPage = mailPage.waitForPopup(verificationLink::click);
        verificationPage.waitForLoadState(
                com.microsoft.playwright.options.LoadState.DOMCONTENTLOADED);
        return verificationPage;
    }
}
