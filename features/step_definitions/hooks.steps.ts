import { After, Before, Status, AfterAll, BeforeAll, ITestCaseHookParameter, World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import { Builder, WebDriver } from "selenium-webdriver";
import { AppConfig } from "../../src/AppConfig";
import CustomWorld from "../../src/CustomWorld";
import * as fs from 'fs';
import DriverUtil from "../../src/DriverUtil";


let executionInfo = JSON.parse(fs.readFileSync("report/executioninfo.json").toString());
const appConfig: AppConfig = new AppConfig();

Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {

    let browser = 'chrome';

    this.driver = new Builder().forBrowser(browser).withCapabilities(appConfig.getCapabilities(browser)).build();

    await this.driver.manage().setTimeouts({ implicit: appConfig.getImplicitWaitTimeout(), pageLoad: appConfig.getWaitTimeOut() });
    

    const browserName = await this.driver.getCapabilities().then( async (caps) => {
        return await caps.get('browserName');
    });
    if(browserName!='chrome'){
        await this.driver.manage().window().maximize();
    }
    await this.driver.manage().deleteAllCookies();
    console.log("Scenario started: " + scenario.pickle.name);
    console.log("Browser loaded");
    this.driverUtil = new DriverUtil(this);
    await this.driver.get("https://ramu:ramu123@dev.atom.com");
    await this.driver.sleep(3000);
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
    if (scenario.result?.status === Status.FAILED) {
        const screenShot = await this.driver.takeScreenshot();
        this.attach(screenShot, "base64:image/png");
    }
    console.log("Scenario completed: " + scenario.pickle.name);
    await this.driver.close();
    await this.driver.quit();
});

BeforeAll(async function () {
    if(executionInfo.startTime == undefined){
        executionInfo.startTime = new Date().getTime().toString();
        fs.writeFileSync("report/executioninfo.json", JSON.stringify(executionInfo));
    }
});

AfterAll(async function () {
    executionInfo.endTime = new Date().getTime().toString();
    fs.writeFileSync("report/executioninfo.json", JSON.stringify(executionInfo));
});