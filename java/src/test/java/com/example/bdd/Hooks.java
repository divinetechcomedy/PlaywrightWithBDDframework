package com.example.bdd;

import com.microsoft.playwright.Page;
import io.cucumber.java.After;
import io.cucumber.java.AfterStep;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Locale;
import java.util.regex.Pattern;

public class Hooks {
    private final TestWorld world;
    private final Path projectDirectory = Path.of("").toAbsolutePath();

    public Hooks(TestWorld world) {
        this.world = world;
    }

    @Before
    public void setUp() throws IOException {
        Files.createDirectories(projectDirectory.resolve("reports/videos"));
        Files.createDirectories(projectDirectory.resolve("reports/traces"));
        Files.createDirectories(projectDirectory.resolve("screenshots"));
        world.start(projectDirectory.resolve("reports"));
    }

    @AfterStep
    public void captureStepScreenshot(Scenario scenario) throws IOException {
        int stepNumber = world.nextScreenshotStepNumber();
        
        String scenarioName = safeFilePart(scenario.getName(), 36);
        String stepName = safeFilePart(scenario.getId(), 32);
        int pageNumber = 1;

        for (Page page : world.browserContext().pages()) {
            if (!page.isClosed()) {
                Path screenshotPath = projectDirectory.resolve("screenshots").resolve(
                        scenarioName + "-" + safeFilePart(scenario.getId(), 8)
                                + "-step-" + String.format("%03d", stepNumber)
                                + "-" + stepName + "-page-" + pageNumber + ".png");
                byte[] screenshot = page.screenshot(
                        new Page.ScreenshotOptions().setPath(screenshotPath));
                scenario.attach(screenshot, "image/png", screenshotPath.getFileName().toString());
                pageNumber++;
            }
        }
    }

    @After
    public void tearDown(Scenario scenario) {
        String scenarioName = safeFilePart(scenario.getName(), 48);
        Path tracePath = projectDirectory.resolve("reports/traces").resolve(
                scenarioName + "-" + safeFilePart(scenario.getId(), 36) + ".zip");
        world.stop(tracePath);
    }

    private static String safeFilePart(String value, int maxLength) {
        String safe = Pattern.compile("[^a-z0-9]+", Pattern.CASE_INSENSITIVE)
                .matcher(value)
                .replaceAll("-")
                .replaceAll("^-|-$", "")
                .toLowerCase(Locale.ROOT);
        if (safe.isEmpty()) {
            return "scenario";
        }
        return safe.substring(0, Math.min(safe.length(), maxLength));
    }
}
