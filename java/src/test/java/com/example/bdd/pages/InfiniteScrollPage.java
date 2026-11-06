package com.example.bdd.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;
import java.util.Objects;

public class InfiniteScrollPage {
    private final Page page;
    private int simpleItemCountAtEnd;

    public InfiniteScrollPage(Page page) {
        this.page = page;
    }

    public void open() {
        page.navigate("https://qaplayground.com/practice/infinite-scroll");
        page.getByRole(AriaRole.HEADING, new Page.GetByRoleOptions()
                        .setName("Infinite Scroll Automation Practice"))
                .waitFor(visible());
    }

    public void scrollSimpleListToEnd() {
        Locator container = page.getByTestId("scroll-container-simple");
        Locator items = container.locator("[data-testid^=\"item-\"]");
        int initialCount = items.count();
        Locator endMarker = page.getByTestId("end-of-list-simple");

        for (int attempt = 0; attempt < 10 && !endMarker.isVisible(); attempt++) {
            container.hover();
            page.mouse().wheel(0, 600);
            page.waitForTimeout(600);
        }

        require(items.count() > initialCount, "The simple list did not append any items");
        endMarker.waitFor(visible());
        simpleItemCountAtEnd = items.count();
    }

    public void expectSimpleListReachedEnd() {
        Locator items = page.getByTestId("scroll-container-simple").locator("[data-testid^=\"item-\"]");
        require(items.count() > 5, "The simple list did not append the expected items");
        page.getByTestId("end-of-list-simple").waitFor(visible());
    }

    public void scrollSimpleListToTop() {
        page.getByTestId("scroll-container-simple").evaluate("element => element.scrollTo(0, 0)");
        page.waitForTimeout(500);
    }

    public void expectScrollingUpDoesNotAppendItems() {
        Locator items = page.getByTestId("scroll-container-simple").locator("[data-testid^=\"item-\"]");
        require(items.count() == simpleItemCountAtEnd,
                "Scrolling to the top changed the item count from " + simpleItemCountAtEnd + " to " + items.count());
    }

    public void scrollToAndClickInvoice(String invoiceId) {
        Locator container = page.getByTestId("scroll-container-dynamic");
        Locator target = page.locator("[data-invoice-id=\"" + invoiceId + "\"]");

        for (int attempt = 0; attempt < 16 && target.count() == 0; attempt++) {
            scrollToBottom(container);
            page.waitForTimeout(700);
        }

        target.waitFor(visible());
        target.getByRole(AriaRole.BUTTON, new Locator.GetByRoleOptions().setName("Action")).click();
    }

    public void expectInvoiceClicked(String invoiceId) {
        require(page.getByTestId("result-s02").textContent().equals("Clicked Invoice " + invoiceId),
                "The page did not confirm the action for invoice " + invoiceId);
    }

    public void scrollVirtualListToRow(int rowNumber) {
        page.getByTestId("scroll-container-virtual")
                .evaluate("(element, row) => element.scrollTo(0, (row - 1) * 40)", rowNumber);
    }

    public void expectVirtualizedRowVisible(int rowNumber, int removedRowNumber) {
        page.getByTestId("virtual-item-" + rowNumber).waitFor(visible());
        require(page.getByTestId("virtual-item-" + removedRowNumber).count() == 0,
                "Virtualized row " + removedRowNumber + " was expected to be removed from the DOM");
    }

    public void scrollUntilLoadMoreAppears() {
        Locator container = page.getByTestId("scroll-container-challenge");
        Locator loadMore = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Load More"));

        for (int attempt = 0; attempt < 10 && !loadMore.isVisible(); attempt++) {
            scrollToBottom(container);
            page.waitForTimeout(700);
        }

        loadMore.waitFor(visible());
    }

    public void clickLoadMoreAndConfirmFinalItem() {
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Load More")).click();
        page.getByText("Secret Item 20", new Page.GetByTextOptions().setExact(true)).waitFor(
                new Locator.WaitForOptions().setState(com.microsoft.playwright.options.WaitForSelectorState.ATTACHED));
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Confirm secret item")).click();
    }

    public void expectSecretItemFound() {
        require(Objects.equals(page.getByTestId("result-s04").textContent(), "Found Secret Item"),
                "The page did not confirm finding the secret item");
    }

    private void scrollToBottom(Locator container) {
        container.evaluate("element => element.scrollTo(0, element.scrollHeight)");
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
