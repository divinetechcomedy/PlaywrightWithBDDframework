package com.example.bdd.steps;

import com.example.bdd.TestWorld;
import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class AccountRegistrationSteps {
    private final TestWorld world;

    public AccountRegistrationSteps(TestWorld world) {
        this.world = world;
    }

    @Given("I open the QA Playground")
    public void openQaPlayground() {
        world.qaPlayground().open();
    }

    @When("I open the sign-up form")
    public void openSignUpForm() {
        world.qaPlayground().openSignUp();
    }

    @When("I register a new account as {string}")
    public void registerNewAccount(String name) {
        world.qaPlayground().register(name, world.testEmail(), world.testPassword());
    }

    @Then("I can return to the sign-in form")
    public void returnToSignInForm() {
        world.qaPlayground().returnToSignIn();
    }

    @When("I verify the registration email in Yopmail")
    public void verifyRegistrationEmail() {
        Page verificationPage = world.yopmail().verifyAddress(world.browserContext(), world.testEmail());
        require(verificationPage.url().matches("(?i).*qaplayground\\.com.*"),
                "The email verification page did not navigate to QA Playground: " + verificationPage.url());
    }

    @When("I sign in to the new account")
    public void signInToNewAccount() {
        world.qaPlayground().signIn(world.testEmail(), world.testPassword());
    }

    @Then("I can open the ghost element challenge")
    public void openGhostElementChallenge() {
        world.qaPlayground().openGhostElementChallenge();
    }

    private static void require(boolean condition, String message) {
        if (!condition) {
            throw new AssertionError(message);
        }
    }
}
