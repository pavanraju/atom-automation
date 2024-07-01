import { By, Locator } from "selenium-webdriver";
import CustomWorld from "../CustomWorld";


export default class DomainPage{

    private domainTitle: Locator = By.xpath("//div[@class='do-title']/h3");

    private purchaseDomain: Locator = By.id("purchase-box-desktop");

    private paymentTypeInPurchaseDomain: Locator = By.xpath("//div[@id='purchase-box-desktop']//input[@name='payment_method']");

    private proceedToPaymentButtonInPurchaseDomain: Locator = By.className("button-proceed");

    async verifyDomainTitle(customWorld: CustomWorld, title: string): Promise<void> {
        await customWorld.driverUtil.assertText(this.domainTitle, title);
        await customWorld.driverUtil.sleep(2000);
    }

    async waitForDomainPageIsLoaded(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.waitForElementPresent(this.domainTitle);
    }

    async selectPurhaseTypeInPurchaseDomain(customWorld: CustomWorld, purchase_type: string): Promise<void> {
        await customWorld.driverUtil.waitForElementPresent(this.purchaseDomain);
        await customWorld.driverUtil.waitForElementPresent(this.paymentTypeInPurchaseDomain);
        //write paymentTypeInPurchaseDomain find elements loop  
        const paymentTypeElements = await customWorld.driverUtil.findElements(this.paymentTypeInPurchaseDomain);
        let foundPurchaseType = false;

        for (const element of paymentTypeElements) {
            const paymentTypeAttr = await element.getAttribute("value");

            if (paymentTypeAttr === purchase_type) {
                // Click on the found purchase type
                if(paymentTypeElements.length > 1){
                    await customWorld.driverUtil.jsClick(element);
                }
                foundPurchaseType = true;
                break;
            }
        }

        await customWorld.driverUtil.assertTrue(foundPurchaseType, `Purchase type "${purchase_type}" not found`);

    }

    async clickOnProceedToPaymentButtonInPurchaseDomain(customWorld: CustomWorld): Promise<void>{
        await customWorld.driverUtil.waitForElementPresent(this.proceedToPaymentButtonInPurchaseDomain);
        await customWorld.driverUtil.jsClick(this.proceedToPaymentButtonInPurchaseDomain);
    }

}