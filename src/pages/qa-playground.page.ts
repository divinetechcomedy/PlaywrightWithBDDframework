import { expect as playwrightExpect, type Page } from "@playwright/test";

const expect = playwrightExpect.configure({ timeout: 10_000 });

export class QaPlaygroundPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto("https://qaplayground.com/");
    await expect(this.page).toHaveURL(/qaplayground\.com/);
  }

  async openSignUp(): Promise<void> {
    await this.page.getByRole("link", { name: "Log in / Sign up" }).click();
    await this.page.getByTestId("sign-up-link").click();
    await expect(this.page.getByTestId("name-input")).toBeVisible();
  }

  async register(name: string, email: string, password: string): Promise<void> {
    await this.page.getByTestId("name-input").fill(name);
    await this.page.getByTestId("email-input").fill(email);
    await this.page.getByTestId("password-input").fill(password);
    await this.page.getByTestId("sign-up-submit").click();
    await expect(this.page.getByRole("link", { name: "Back to sign in" })).toBeVisible();
  }

  async returnToSignIn(): Promise<void> {
    await this.page.getByRole("link", { name: "Back to sign in" }).click();
    await expect(this.page.getByTestId("sign-in-submit")).toBeVisible();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.page.getByTestId("email-input").fill(email);
    await this.page.getByTestId("password-input").fill(password);
    await this.page.getByTestId("sign-in-submit").click();
    await expect(this.page.getByTestId("nav-qa-tools")).toBeVisible();
  }

  async openGhostElementChallenge(): Promise<void> {
    await this.page.getByTestId("nav-qa-tools").click();
    await this.page.getByTestId("nav-chrome").click();
    await this.page.getByTestId("nav-challenges").click();

    const challenge = this.page.getByTestId("challenge-card-ghost-element");
    await expect(challenge).toBeVisible();
    await challenge.click();
  }
}