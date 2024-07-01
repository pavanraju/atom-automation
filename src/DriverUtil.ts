import { By, Locator, ThenableWebDriver, WebElement, until } from "selenium-webdriver";
import * as assert from "assert";
const { Select } = require('selenium-webdriver/lib/select');
import CustomWorld from "./CustomWorld";
import { AppConfig } from "./AppConfig";


const appConfig: AppConfig = new AppConfig();


export default class DriverUtil {

    //constructor
    private customWorld;
    private driver;

    constructor(customWorld: CustomWorld) {
        this.customWorld = customWorld;
        this.driver = customWorld.driver;
    }

    async findElement(elementLocator: Locator) {
        return await this.driver.findElement(elementLocator);
    }

    async findElements(elementLocator: Locator) {
        return await this.driver.findElements(elementLocator);
    }

    async sleep(time_ms: number) {
        await this.driver.sleep(time_ms);
    }

    async click(elementLocator: Locator) {
        await (await this.findElement(elementLocator)).click();
    }

    async type(elementLocator: Locator, value: string) {
        await (await this.findElement(elementLocator)).sendKeys(value);
    }

    async clearAndType(elementLocator: Locator, value: string) {
        await (await this.findElement(elementLocator)).clear();
        await this.type(elementLocator, value);
    }

    async getText(elementLocator: Locator): Promise<string> {
        return (await this.findElement(elementLocator)).getText();
    }

    async getValue(elementLocator: Locator): Promise<string> {
        return (await this.findElement(elementLocator)).getAttribute('value');
    }

    async getAttribute(elementLocator: Locator, attributeName: string): Promise<string> {
        return (await this.findElement(elementLocator)).getAttribute(attributeName);
    }

    async isEditable(elementLocator: Locator): Promise<boolean> {
        return (await this.findElement(elementLocator)).isEnabled();
    }

    async jsClick(elementLocator: Locator | WebElement) {
        if (elementLocator instanceof WebElement) {
            await this.driver.executeScript("arguments[0].click();", elementLocator);
        }else{
            await this.driver.executeScript("arguments[0].click();", await this.findElement(elementLocator));
        }
    }

    async switchToDefaultContent() {
        await this.driver.switchTo().defaultContent();
    }

    async selectByVisibleText(elementLocator: Locator, value: string, search: boolean) {
        const selectElement = await this.findElement(elementLocator);
        const classAttrValue = await selectElement.getAttribute("class");
        if (classAttrValue.includes("select2")) {
            await this.select2ByVisibleText(elementLocator, value, search);
        } else {
            const htmlElement = new Select(selectElement);
            await htmlElement.selectByVisibleText(value);
        }
    }

    async select2ByVisibleText(elementLocator: Locator, value: string, search: boolean) {
        const parentSelectBox = await this.findElement(elementLocator);
        //await parentSelectBox.findElement(By.xpath(".//span")).click();
        parentSelectBox.findElement(By.xpath("following-sibling::span[1]")).click();
        let foundValue: boolean = false;
        await this.sleep(1000);
        if (search) {

            const searchTextBox = await parentSelectBox.findElement(By.css("input[type='search']"));
            //Below condition required for handling country dropdown issue, when value has pipe we are unable to search in vendor and other modules
            let valueToSearch = value;
            await this.sleep(1000);
            try {
                await searchTextBox.sendKeys(valueToSearch);
            } catch (error) {
                console.log("Error typing using sendkeys");
                //await this.driver.executeScript("arguments[0].setAttribute('data-testnew', 'pavan')", searchTextBox);
                await this.driver.executeScript("arguments[0].value='" + value + "';arguments[0].dispatchEvent(new Event('change'));arguments[0].dispatchEvent(new Event('keydown'));", searchTextBox);
            }
            await this.sleep(3000);
        }
        let options = await this.findElements(By.xpath(".//*[@role='option']"));
        for (let eachOption of options) {
            if (await eachOption.getText() == value) {
                await eachOption.click();
                foundValue = true;
                break;
            }
        }
        await this.assertTrue(foundValue, "Option " + value + " Not Available");
    }

    async switchToNewWindow() {
        // Get the current window handle
        const originalWindow = await this.driver.getWindowHandle();
    
        // Wait for the new window to appear
        await this.driver.wait(async () => (await this.driver.getAllWindowHandles()).length > 1, 10000);
    
        // Get all window handles
        const windows = await this.driver.getAllWindowHandles();
    
        // Switch to the new window (the one that is not the original window)
        for (const handle of windows) {
            if (handle !== originalWindow) {
                await this.driver.switchTo().window(handle);
                break;
            }
        }
    
        // Now the driver is focused on the new window, you can perform actions in the new window
        // Example: You can close the new window and switch back to the original window if needed
        // await driver.close();
        // await driver.switchTo().window(originalWindow);
    }

    async waitForFrameAndSwitch(elementLocator: Locator) {
        await this.waitForElementPresent(elementLocator);
        const frameElement = this.driver.findElement(elementLocator);
        const condition = until.ableToSwitchToFrame(frameElement);
        await this.driver.wait(condition, appConfig.getWaitTimeOut());
    }

    async waitForEditable(elementLocator: Locator) {
        await this.waitForElementPresent(elementLocator);
        const condition = until.elementIsEnabled(await this.findElement(elementLocator));
        await this.driver.wait(condition, appConfig.getWaitTimeOut());
    }

    async waitForText(elementLocator: Locator, waitForText: string) {
        await this.waitForElementPresent(elementLocator);
        const condition = until.elementTextIs(await this.findElement(elementLocator), waitForText);
        await this.driver.wait(condition, appConfig.getWaitTimeOut());
    }

    async waitForVisible(elementLocator: Locator | WebElement) {
        if (elementLocator instanceof WebElement) {
            const condition = until.elementIsVisible(elementLocator);
            await this.driver.wait(condition, appConfig.getWaitTimeOut());
        } else {
            await this.waitForElementPresent(elementLocator);
            const condition = until.elementIsVisible(await this.findElement(elementLocator));
            await this.driver.wait(condition, appConfig.getWaitTimeOut());
        }
    }

    async waitForElementPresent(elementLocator: Locator) {
        const condition = until.elementLocated(elementLocator);
        await this.driver.wait(condition, appConfig.getWaitTimeOut());
    }

    async waitForElementNotPresent(elementLocator: Locator) {
        await this.driver.wait(async () => {
            const elements = await this.driver.findElements(elementLocator);
            if (elements.length <= 0) {
                return true;
            }
            return false;
        }, appConfig.getWaitTimeOut(), 'The element was still present when it should have disappeared.');
    }

    async waitForAlert() {
        const condition = until.alertIsPresent();
        await this.driver.wait(condition, appConfig.getWaitTimeOut());
    }
    

    async assertText(elementLocator: Locator, expectedText: string, message?: string) {
        assert.equal(await this.getText(elementLocator), expectedText, message);
    }

    async assertTrue(condition : boolean, message?: string) {
        assert.ok(condition, message);
    }


}