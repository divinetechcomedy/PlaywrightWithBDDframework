Feature: QA Playground infinite scroll

  Background:
    Given I open the Infinite Scroll practice page

  Scenario: Simple list appends items and reaches the end
    When I scroll the simple list to the end
    Then the simple list has appended items and shows the end marker
    When I scroll back to the top of the simple list
    Then scrolling up does not append another batch

  Scenario: Find and act on a dynamically loaded invoice
    When I scroll to invoice "INV-042" and click its action
    Then invoice "INV-042" is confirmed as clicked

  Scenario: Virtualized list removes off-screen rows
    When I scroll the virtualized list to row 50
    Then row 50 is visible and row 1 is removed from the DOM

  Scenario: Manually load and confirm the final item
    When I scroll the secret list until Load More appears
    And I click Load More and confirm the final item
    Then the secret item is found
