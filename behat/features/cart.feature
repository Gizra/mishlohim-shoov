Feature: Add to cart
  In order to be able to add to cart.
  As an anonymous user
  We need to be able to have access to a blog post page

  @javascript
  Scenario: Visit blog post page
    Given I am an anonymous user
    When  I visit "Menu.aspx?BusinessID=3271&v=list&n=river_tel_aviv"
    And   I accept notices
    And   I add to cart
    Then  I should see the item added to the cart
