package com.example.bdd.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;

public class QaPlaygroundPage {
    private final Page page;

    public QaPlaygroundPage(Page page) {
        this.page = page;
    }

    public void open() {
        page.navigate("https://qaplayground.com/");
        require(page.url().matches("(?i).*qaplayground\\.com.*"),
                "The QA Playground did not open: " + page.url());
    }

    public void openSignUp() {
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Log in / Sign up")).click();
        page.getByTestId("sign-up-link").click();
        page.getByTestId("name-input").waitFor(visible());
    }

    public void register(String name, String email, String password) {
        page.getByTestId("name-input").fill(name);
        page.getByTestId("email-input").fill(email);
        page.getByTestId("password-input").fill(password);
        page.getByTestId("sign-up-submit").click();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Back to sign in"))
                .waitFor(visible());
    }

    public void returnToSignIn() {
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Back to sign in")).click();
        page.getByTestId("sign-in-submit").waitFor(visible());
    }

    public void signIn(String email, String password) {
        page.getByTestId("email-input").fill(email);
        page.getByTestId("password-input").fill(password);
        page.getByTestId("sign-in-submit").click();
        page.getByTestId("nav-qa-tools").waitFor(visible());
    }

    public void openGhostElementChallenge() {
        page.getByTestId("nav-qa-tools").click();
        page.getByTestId("nav-chrome").click();
        page.getByTestId("nav-challenges").click();

        Locator challenge = page.getByTestId("challenge-card-ghost-element");
        challenge.waitFor(visible());
        challenge.click();
    }

    private static Locator.WaitForOptions visible() {
        return new Locator.WaitForOptions().setState(com.microsoft.playwright.options.WaitForSelectorState.VISIBLE);
    }

    private static void require(boolean condition, String message) {
        if (!condition) {
            throw new AssertionError(message);
        }
    }
}
