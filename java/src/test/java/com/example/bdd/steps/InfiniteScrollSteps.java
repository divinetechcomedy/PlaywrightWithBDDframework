package com.example.bdd.steps;

import com.example.bdd.TestWorld;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class InfiniteScrollSteps {
    private final TestWorld world;

    public InfiniteScrollSteps(TestWorld world) {
        this.world = world;
    }

    @Given("I open the Infinite Scroll practice page")
    public void openInfiniteScrollPracticePage() {
        world.infiniteScrollPage().open();
    }

    @When("I scroll the simple list to the end")
    public void scrollSimpleListToEnd() {
        world.infiniteScrollPage().scrollSimpleListToEnd();
    }

    @Then("the simple list has appended items and shows the end marker")
    public void simpleListHasAppendedItemsAndEndMarker() {
        world.infiniteScrollPage().expectSimpleListReachedEnd();
    }

    @When("I scroll back to the top of the simple list")
    public void scrollSimpleListToTop() {
        world.infiniteScrollPage().scrollSimpleListToTop();
    }

    @Then("scrolling up does not append another batch")
    public void scrollingUpDoesNotAppendItems() {
        world.infiniteScrollPage().expectScrollingUpDoesNotAppendItems();
    }

    @When("I scroll to invoice {string} and click its action")
    public void scrollToAndClickInvoice(String invoiceId) {
        world.infiniteScrollPage().scrollToAndClickInvoice(invoiceId);
    }

    @Then("invoice {string} is confirmed as clicked")
    public void invoiceIsConfirmedAsClicked(String invoiceId) {
        world.infiniteScrollPage().expectInvoiceClicked(invoiceId);
    }

    @When("I scroll the virtualized list to row {int}")
    public void scrollVirtualListToRow(int rowNumber) {
        world.infiniteScrollPage().scrollVirtualListToRow(rowNumber);
    }

    @Then("row {int} is visible and row {int} is removed from the DOM")
    public void virtualizedRowIsVisibleAndOldRowRemoved(int rowNumber, int removedRowNumber) {
        world.infiniteScrollPage().expectVirtualizedRowVisible(rowNumber, removedRowNumber);
    }

    @When("I scroll the secret list until Load More appears")
    public void scrollUntilLoadMoreAppears() {
        world.infiniteScrollPage().scrollUntilLoadMoreAppears();
    }

    @When("I click Load More and confirm the final item")
    public void clickLoadMoreAndConfirmFinalItem() {
        world.infiniteScrollPage().clickLoadMoreAndConfirmFinalItem();
    }

    @Then("the secret item is found")
    public void secretItemIsFound() {
        world.infiniteScrollPage().expectSecretItemFound();
    }
}
