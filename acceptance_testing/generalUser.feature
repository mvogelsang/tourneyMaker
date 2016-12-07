Feature: Interact with the site's accounting system

  As a User, I should be able to
  reliably make an account, log in,
  log out, see my data, and change my data

  Scenario: Logging into the site and logging out
    Given I am at the site
    When I log in as "testgenericuser" with password "genericpass"
    Then I should be taken to a page with "testgenericuser" on it
    And I should be able to log out

  Scenario: Making an Account
    Given I am at the site
    When I should see my new username if I register

  Scenario: Changing account information
    Given I am at the site
    When I log in as "testgenericuser" with password "genericpass"
    And navigate to the profile page
    Then I should see my bio "I like steak", and be able to change it to "I like CAKE!!!"
    And Then I should see my bio "I like CAKE!!!", and be able to change it to "I like steak"

  
