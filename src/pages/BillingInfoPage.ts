import { By, Locator } from "selenium-webdriver";
import { faker } from '@faker-js/faker';

import CustomWorld from "../CustomWorld";
import { DataTable } from "@cucumber/cucumber";


export default class BillingInfoPage{

    private billingInfoHeader: Locator = By.xpath("//div[@class='container']/div[@class='select-cate']/div/h2");

    private purchaseDomain: Locator = By.id("purchase-box-desktop");

    private paymentTypeInPurchaseDomain: Locator = By.xpath("//div[@id='purchase-box-desktop']//input[@name='payment_method']");

    private proceedToPaymentButtonInPurchaseDomain: Locator = By.className("button-proceed");

    private paymentInfoStep: Locator = By.xpath("//div[@class='steps']/a[2]");

    private paymentOptions: Locator = By.xpath("//div[@class='payments-tabs options-tabs']/div");

    private paymentSuccess: Locator = By.xpath("//div[@class='payment-success']/h3");

    private goToTransfersLink: Locator = By.xpath("//div[@class='payment-success']/a");

    async waitForBillingInfoPageIsLoaded(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.waitForElementPresent(this.billingInfoHeader);
    }

    async verifyBillingInfoHeader(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.assertText(this.billingInfoHeader, "Please fill-in your billing information");
    }

    async enterBillingInfoDetails(customWorld: CustomWorld): Promise<void> {
        const randomEmail = faker.internet.email().replace(/@/, `+${faker.number.int()}@`);
        const randomPassword = faker.internet.password();
        const randomFirstName = faker.person.firstName();
        const randomLastName = faker.person.lastName();
        const randomCompanyName = faker.company.name();
        const randomAddress = faker.location.streetAddress();
        const randomState = faker.location.state();
        const randomCity = faker.location.city();
        const randomPostalCode = faker.location.zipCode();
        const randomPhoneNumber = faker.phone.number();

        await customWorld.driverUtil.type(By.name('email_address'), randomEmail);
        await customWorld.driverUtil.type(By.name('password'), randomPassword);
        await customWorld.driverUtil.type(By.name('name'), randomFirstName);
        await customWorld.driverUtil.type(By.name('lastname'), randomLastName);
        await customWorld.driverUtil.type(By.name('company_name'), randomCompanyName);
        await customWorld.driverUtil.type(By.name('address'), randomAddress);
        await customWorld.driverUtil.type(By.name('state'), randomState);
        await customWorld.driverUtil.type(By.name('city'), randomCity);
        await customWorld.driverUtil.selectByVisibleText(By.name('country'), "United States", false);
        await customWorld.driverUtil.type(By.name('zip'), randomPostalCode);
        await customWorld.driverUtil.type(By.name('phone_no'), randomPhoneNumber);
        await customWorld.driverUtil.click(By.name('zip'));
        await customWorld.driverUtil.sleep(1500);
    }

    async clickOnNextStepsInSignUpForm(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.click(By.xpath("//form[@id='signupForm']//button")); 
        await customWorld.driverUtil.sleep(1500);
    }

    async verifyPaymentInfoIsDisplayed(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.waitForElementPresent(this.paymentInfoStep);
        let classvalue = await customWorld.driverUtil.getAttribute(this. paymentInfoStep, "class");
        if (!classvalue.includes("active")) {
            throw new Error("Payment info is not displayed");
        }
    }

    async selectPaymentOption(customWorld: CustomWorld, payment_option: string): Promise<void> {
        await customWorld.driverUtil.waitForElementPresent(this.paymentOptions);

        let foundPaymentOption = false;
        const paymentOptionsElements = await customWorld.driverUtil.findElements(this.paymentOptions);

        for (const optionElement of paymentOptionsElements) {
            const optionValue = await optionElement.getAttribute("data-option");
            if (optionValue === payment_option) {
                await optionElement.click();
                foundPaymentOption = true;
                break;
            }
        }

        await customWorld.driverUtil.assertTrue(foundPaymentOption, `Payment option "${payment_option}" not found`);

        await customWorld.driverUtil.sleep(1500);
    }

    async selectPaymentMethod(customWorld: CustomWorld, payment_method: string): Promise<void> {
        await customWorld.driverUtil.waitForFrameAndSwitch(By.xpath("//iframe[starts-with(@name, '__privateStripeFrame')]"));
        if(payment_method === 'card'){
            await customWorld.driverUtil.waitForElementPresent(By.id("card-tab"));
            await customWorld.driverUtil.click(By.id("card-tab"));
        }else{
            await customWorld.driverUtil.waitForElementPresent(By.id("us_bank_account-tab"));
            await customWorld.driverUtil.click(By.id("us_bank_account-tab"));
        }
        await customWorld.driverUtil.sleep(1500);
    }

    async verifyPaymentMethodDetailsDisplayed(customWorld: CustomWorld, payment_method: string): Promise<void> {
        if(payment_method === 'card'){
            await customWorld.driverUtil.waitForElementPresent(By.id("card-panel"));
        }else{
            await customWorld.driverUtil.waitForElementPresent(By.id("us_bank_account-panel"));
        }
    }

    async enterPaymentDetails(customWorld: CustomWorld, payment_method: string, data_table: DataTable): Promise<void> {
        if(payment_method === 'card'){
            //enter details for above id fields
            await customWorld.driverUtil.type(By.id("Field-numberInput"), data_table.raw()[1][1]);
            await customWorld.driverUtil.type(By.id("Field-expiryInput"), data_table.raw()[2][1]);
            await customWorld.driverUtil.type(By.id("Field-cvcInput"), data_table.raw()[3][1]);
        }else{
            
        }
        await customWorld.driverUtil.switchToDefaultContent();
        await customWorld.driverUtil.jsClick(By.id("agree"));
    }

    async clickOnPay(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.jsClick(By.xpath("//button[starts-with(@class, 'pay-button')]"));
    }

    async verifyPaymentIsSuccessful(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.waitForVisible(this.paymentSuccess);
        await customWorld.driverUtil.assertText(this.paymentSuccess, "Thank you for your payment.");
    }

    async clickOnGoToTransferCenterLink(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.waitForVisible(this.goToTransfersLink);
        await customWorld.driverUtil.click(this.goToTransfersLink);
    }

}