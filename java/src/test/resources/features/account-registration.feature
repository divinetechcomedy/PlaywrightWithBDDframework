Feature: QA Playground account registration

  Scenario: Register, verify the email, sign in, and open the ghost element challenge
    Given I open the QA Playground
    When I open the sign-up form
    And I register a new account as "Ashish"
    Then I can return to the sign-in form
    When I verify the registration email in Yopmail
    And I sign in to the new account
    Then I can open the ghost element challenge
