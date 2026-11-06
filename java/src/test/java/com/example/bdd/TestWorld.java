package com.example.bdd;

import com.example.bdd.pages.InfiniteScrollPage;
import com.example.bdd.pages.QaPlaygroundPage;
import com.example.bdd.pages.YopmailPage;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import java.nio.file.Path;

public class TestWorld {
    private Playwright playwright;
    private Browser browser;
    private BrowserContext browserContext;
    private Page page;
    private boolean traceStarted;
    private QaPlaygroundPage qaPlayground;
    private InfiniteScrollPage infiniteScrollPage;
    private YopmailPage yopmail;
    private int screenshotStepNumber;
    private final String testName = System.getenv().getOrDefault("TEST_NAME", "Ashish");
    private final String testEmail = System.getenv().getOrDefault(
            "TEST_EMAIL", "ashishbdd" + System.currentTimeMillis() + "@yopmail.com");
    private final String testPassword = System.getenv().getOrDefault("TEST_PASSWORD", "Test@1234");

    public void start(Path reportsDirectory) {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions()
                        .setHeadless(!"false".equalsIgnoreCase(System.getenv("HEADLESS"))));
        browserContext = browser.newContext(
                new Browser.NewContextOptions()
                        .setRecordVideoDir(reportsDirectory.resolve("videos")));
        browserContext.tracing().start(
                new com.microsoft.playwright.Tracing.StartOptions()
                        .setScreenshots(true)
                        .setSnapshots(true)
                        .setSources(true));
        traceStarted = true;
        page = browserContext.newPage();
        page.setDefaultTimeout(10_000);
        qaPlayground = new QaPlaygroundPage(page);
        infiniteScrollPage = new InfiniteScrollPage(page);
        yopmail = new YopmailPage();
        screenshotStepNumber = 0;
    }

    public void stop(Path tracePath) {
        try {
            if (browserContext != null && traceStarted) {
                browserContext.tracing().stop(
                        new com.microsoft.playwright.Tracing.StopOptions().setPath(tracePath));
                traceStarted = false;
            }
        } finally {
            try {
                if (browserContext != null) {
                    browserContext.close();
                }
            } finally {
                try {
                    if (browser != null) {
                        browser.close();
                    }
                } finally {
                    if (playwright != null) {
                        playwright.close();
                    }
                }
            }
        }
    }

    public BrowserContext browserContext() {
        return requireInitialized(browserContext, "The browser context fixture has not been initialized");
    }

    public Page page() {
        return requireInitialized(page, "The page fixture has not been initialized");
    }

    public QaPlaygroundPage qaPlayground() {
        return requireInitialized(qaPlayground, "The QA Playground page fixture has not been initialized");
    }

    public InfiniteScrollPage infiniteScrollPage() {
        return requireInitialized(infiniteScrollPage, "The infinite scroll page fixture has not been initialized");
    }

    public YopmailPage yopmail() {
        return requireInitialized(yopmail, "The Yopmail page fixture has not been initialized");
    }

    public String testName() {
        return testName;
    }

    public String testEmail() {
        return testEmail;
    }

    public String testPassword() {
        return testPassword;
    }

    public int nextScreenshotStepNumber() {
        return ++screenshotStepNumber;
    }

    private static <T> T requireInitialized(T value, String message) {
        if (value == null) {
            throw new IllegalStateException(message);
        }
        return value;
    }

}
