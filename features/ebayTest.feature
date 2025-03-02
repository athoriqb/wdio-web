Feature: eBay Automation Tests

  Background: Open eBay Homepage
    Given I open the eBay homepage

  Scenario: Access a Product via Category with Filters
    When I go to the Cell Phones & Smartphones listing
    When I apply the following filters:
      | filter     | value   |
      | condition  | New     |
      | price      | Under   |
      | network    | Unlocked|
    Then I should see the applied filter tags as:
      | filter     | value   |
      | condition  | New     |
      | price      | Under   |
      | network    | Unlocked|

  Scenario: Access a Product via Search
    When I search for "MacBook" in the "Computers/Tablets & Networking" category
    Then I should see the first result title containing "MacBook"