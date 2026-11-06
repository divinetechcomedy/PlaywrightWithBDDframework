# Playwright BDD Framework

An isolated TypeScript framework using Cucumber for Gherkin scenarios and
Playwright for browser automation. It does not modify or depend on the Maven
build in the workspace root.

## Setup

Run these commands from this directory:

```powershell
npm install
npx playwright install chromium
```

## Run

```powershell
npm test
npm run typecheck
```

The registration scenario creates a fresh disposable Yopmail address per run.
Set `TEST_EMAIL`, `TEST_NAME`, or `TEST_PASSWORD` to override its test data.
Set `HEADLESS=false` to run Chromium with a visible window.

## Scenario fixtures

The Cucumber `World` provides scenario-scoped Playwright fixtures through
`features/support/fixtures.ts`. The `Before` hook initializes the browser,
context, and page; step definitions access these resources and page objects
through the World. The `After` hook saves the trace and closes the resources,
keeping each scenario isolated.

## Test reports and artifacts

`npm test` writes Cucumber HTML, JSON, and JUnit reports to `reports/`.
Step screenshots are saved in `screenshots/` and attached to the Cucumber HTML
report. Each scenario also records a Playwright trace in `reports/traces/` and
browser videos in `reports/videos/`. Open a trace with:

```powershell
npx playwright show-trace reports/traces/<trace-file>.zip
```

The HTML report contains the scenario and step results; trend charts and
historical analytics require a separate reporting service or tool.

## Java version

The `java/` subproject provides a Java + Cucumber + Playwright copy of the
account-registration and infinite-scroll scenarios. It is independent of the
TypeScript framework and the workspace-root Maven project.

Run these commands from `java/`:

```powershell
mvn exec:java "-Dexec.mainClass=com.microsoft.playwright.CLI" "-Dexec.args=install chromium"
mvn test
```

Install Chromium before running the scenarios. The Java test run writes
Cucumber reports to `java/target/`, Playwright traces to
`java/reports/traces/`, videos to `java/reports/videos/`, and step screenshots
to `java/screenshots/`. It accepts the same `TEST_EMAIL`, `TEST_NAME`,
`TEST_PASSWORD`, and `HEADLESS=false` environment variables as the TypeScript
version.

## Locator animation

Open `scripts/colorGame-locator-animation.html` directly in a browser to view
the animated locator lesson. Use **Replay**, **Pause**, and **Fullscreen** to
control playback while recording.

Open `scripts/locator-practice-animation.html` for the locator practice lesson.
Its DOM inspector shows the corresponding HTML structure for each highlighted
element. Select **Enable sound** to hear spoken narration and sound cues;
narration uses the browser's built-in speech synthesis, so no additional
packages or audio files are needed.

Open `scripts/how-playwright-works-animation.html` for an animated overview of
the browser, context, page, locator, action, assertion, and cleanup flow, using
the infinite-scroll page object as its example.