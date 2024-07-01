import { Given, When, Then, DataTable } from "@cucumber/cucumber";

import CustomWorld from "../../src/CustomWorld";
import BillingInfoPage from "../../src/pages/BillingInfoPage";


const billingInfoPage: BillingInfoPage = new BillingInfoPage();

Then('billing info page should be displayed', async function (this: CustomWorld) {
    await billingInfoPage.waitForBillingInfoPageIsLoaded(this);
    await billingInfoPage.verifyBillingInfoHeader(this);
});

Given('the billing details in the billing info page', async function (this: CustomWorld) {
    await billingInfoPage.enterBillingInfoDetails(this);
});

When('i click on next step in billing info page', async function (this: CustomWorld) {
    await billingInfoPage.clickOnNextStepsInSignUpForm(this);
});

Then('payment info should be displayed', async function (this: CustomWorld) {
    await billingInfoPage.verifyPaymentInfoIsDisplayed(this);
});

Given('i select payment option {string}', async function (this: CustomWorld, payment_option: string) {
    await billingInfoPage.selectPaymentOption(this, payment_option);
});

Given('i select payment method as {string}', async function (this: CustomWorld, payment_method: string) {
    await billingInfoPage.selectPaymentMethod(this, payment_method);
});

Then('the appropriate payment form for {string} should be displayed', async function (this: CustomWorld, payment_method: string) {
    await billingInfoPage.verifyPaymentMethodDetailsDisplayed(this, payment_method);
});

Given('the required details in the payment method type {string}', async function (this: CustomWorld, payment_method: string, dataTable: DataTable) {
    await billingInfoPage.enterPaymentDetails(this, payment_method, dataTable);
});

When('i click on the pay in the payment information', async function (this: CustomWorld) {
    await billingInfoPage.clickOnPay(this);
});

Then('payment should be successful', async function (this: CustomWorld) {
    await billingInfoPage.verifyPaymentIsSuccessful(this);
});

When('i click on go to transfer center', async function (this: CustomWorld) {
    await billingInfoPage.clickOnGoToTransferCenterLink(this);
});