import { By, Locator } from "selenium-webdriver";
import CustomWorld from "../CustomWorld";

export default class TransferCenterPage {

    private transferCenterTitle: Locator = By.xpath("//h4[@class='page-title']");

    private domainList: Locator = By.xpath("//div[starts-with(@class, 'card-body')]/h4/div[@class='text-title']");

    private domainName: Locator = By.xpath("//div[@class='card-body']/h3");
    private domainStatus: Locator = By.xpath("//div[@class='card-body']/p");

    async waitForDomainPageIsLoaded(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.waitForVisible(this.transferCenterTitle);
        await customWorld.driverUtil.assertText(this.transferCenterTitle, "Domain Transfer Center");
    }

    async verifyDomainNameExists(customWorld: CustomWorld, domain_name: string): Promise<void> {
        await customWorld.driverUtil.waitForElementPresent(this.domainList);
        let foundDomain = false;
        const domainElements = await customWorld.driverUtil.findElements(this.domainList);

        for (const optionElement of domainElements) {
            const optionValue = await optionElement.getText();
            if (optionValue === domain_name) {
                foundDomain = true;
                break;
            }
        }

        await customWorld.driverUtil.assertTrue(foundDomain, `Domain "${domain_name}" not found in Transfer Center`);
    }

    async clickOnViewDetailsForaDomain(customWorld: CustomWorld, domain_name: string): Promise<void> {
        await customWorld.driverUtil.waitForElementPresent(this.domainList);
        let foundDomain = false;
        const domainElements = await customWorld.driverUtil.findElements(this.domainList);

        for (const optionElement of domainElements) {
            const optionValue = await optionElement.getText();
            if (optionValue === domain_name) {
                await optionElement.findElement(By.xpath("./../..//div[contains(@class, 'btn-primary') and contains(., 'View Details')]")).click();
                //div[text()='WiseRelief.com']/./../..//div[contains(@class, 'btn-primary') and contains(., 'View Details')]
                foundDomain = true;
                break;
            }
        }

        await customWorld.driverUtil.assertTrue(foundDomain, `Domain "${domain_name}" not found in Transfer Center`);
    }

    async verifyDomainDetailsPageIsLoaded(customWorld: CustomWorld): Promise<void> {
        await customWorld.driverUtil.switchToNewWindow();
        let currentUrl = await customWorld.driver.getCurrentUrl();
        await customWorld.driverUtil.assertTrue(currentUrl.includes("transfer-center-details"), "Domain details page is not loaded");
    }

    async verifyDomainAndPurchasedStatus(customWorld: CustomWorld, domain_name: string): Promise<void> {
        await customWorld.driverUtil.waitForVisible(this.domainName);
        await customWorld.driverUtil.assertText(this.domainName, domain_name);
        await customWorld.driverUtil.assertText(this.domainStatus, "Domain Purchased");
    }

}