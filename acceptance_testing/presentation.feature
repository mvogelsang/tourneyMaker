Feature: Ensure the site is up

  As a developer
  I want to know the main site is up
  and trivially working

  Scenario: Make sure the website is up
    Given I have visited the local site
    And the generic test user logs in
    Then the test user should be able to view a tournament
    And the test user should be able to view a user's profile
