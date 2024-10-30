Feature: The Swaglabs Android App Login Feature

  Scenario Outline: As a user, I try to login with different login inputs

    Given I am on the login page
    When I login with <inputType>
    Then I should see the correct error message for <inputType>

    Examples:
      | inputType       |
      | locked_out_user |
      | no_username     |
      | no_password     |
      | no_details      |
