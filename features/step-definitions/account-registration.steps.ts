import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { PlaywrightWorld } from "../support/world";

Given("I open the QA Playground", async function (this: PlaywrightWorld) {
  await this.qaPlayground.open();
});

When("I open the sign-up form", async function (this: PlaywrightWorld) {
  await this.qaPlayground.openSignUp();
});

When("I register a new account as {string}", async function (this: PlaywrightWorld, name: string) {
  await this.qaPlayground.register(name, this.testEmail, this.testPassword);
});

Then("I can return to the sign-in form", async function (this: PlaywrightWorld) {
  await this.qaPlayground.returnToSignIn();
});

When("I verify the registration email in Yopmail", async function (this: PlaywrightWorld) {
  const verificationPage = await this.yopmail.verifyAddress(this.browserContext, this.testEmail);
  await expect(verificationPage).toHaveURL(/qaplayground\.com/);
});

When("I sign in to the new account", async function (this: PlaywrightWorld) {
  await this.qaPlayground.signIn(this.testEmail, this.testPassword);
});

Then("I can open the ghost element challenge", async function (this: PlaywrightWorld) {
  await this.qaPlayground.openGhostElementChallenge();
});