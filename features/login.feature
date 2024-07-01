Feature: Login feature

  Scenario Outline: Verify payment for domain "<domain>"
    Given i open the domain page "<domain>"
    And i select purchase type "<purchaseType>"
    When i click on proceed to payment
    Then billing info page should be displayed
    Given the billing details in the billing info page
    When i click on next step in billing info page
    Then payment info should be displayed
    Given i select payment option "<paymentOption>"
    And i select payment method as "<paymentMethod>"
    Then the appropriate payment form for "<paymentMethod>" should be displayed
    Given the required details in the payment method type "<paymentMethod>"
        | Field         | Value            |
        | <Field1>      | <Value1>         |
        | <Field2>      | <Value2>         |
        | <Field3>      | <Value3>         |
    When i click on the pay in the payment information
    Then payment should be successful
    When i click on go to transfer center
    Then transfer center page should be displayed
    And verify purchased domain "<domain>" in the domain transfer center
    When i click on the view details of the purchased domain "<domain>"
    Then domain details page should be displayed
    And verify status of purchased domain "<domain>" in the domain details page

  Examples: 
    | domain        | purchaseType | paymentOption | paymentMethod   | Field1      | Value1           | Field2         | Value2     | Field3 | Value3      |
    | Proes.com| buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| GoalForce.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| FunPanda.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| UpBrave.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| Burpi.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| WiseRelief.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| GreenStallion.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| Zealeo.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| HyperFused.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| TrulyNoted.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| Ascellis.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| PixelSmile.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |
    #| Symlo.com | buy          | Stripe        | card            | Card Number | 4242424242424242 | Expiry Date    | 12/25      | CVV    | 123         |


    #| GoalForce.com | buy          | Stripe        | us_bank_account | Bank Name   | Example Bank     | Account Number | 1234567890 | IFSC   | ABCD0001234 |
