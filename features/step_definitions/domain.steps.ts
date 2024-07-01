import { Given, When } from "@cucumber/cucumber";
import CustomWorld from "../../src/CustomWorld";
import DomainPage from "../../src/pages/DomainPage";

const domainPage:DomainPage = new DomainPage();

Given('i open the domain page {string}', async function (this: CustomWorld, domain: string) {
    let url = await this.driver.getCurrentUrl();
    await this.driver.get(url+'name/'+domain);
    await domainPage.waitForDomainPageIsLoaded(this);
    await domainPage.verifyDomainTitle(this, domain);
});

Given('i select purchase type {string}', async function (this: CustomWorld, purchase_type: string) {
    await domainPage.selectPurhaseTypeInPurchaseDomain(this, purchase_type);
});

When('i click on proceed to payment', async function (this: CustomWorld) {
    await domainPage.clickOnProceedToPaymentButtonInPurchaseDomain(this);
});