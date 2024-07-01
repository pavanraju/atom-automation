import * as assert from "assert";

import { Given, When, Then, World } from "@cucumber/cucumber";
import { Greeter } from "../../src";

interface MyWorld {
  whatIHeard: string;
}

When("the greeter says hello", function (this: MyWorld) {
  this.whatIHeard = new Greeter().sayHello();
});

Then(
  "I should have heard {string}",
  function (this: MyWorld, expectedResponse: string) {
    assert.equal(this.whatIHeard, expectedResponse);
  }
);


import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import CustomWorld from "../../src/CustomWorld";


Given('I am on the Google search page', async function (this: CustomWorld) {
  await this.driver.get('https://www.google.com');
});

When('I search for {string}', async function (this: CustomWorld, searchTerm: string) {
  let element = await this.driver.findElement(By.name('q'));
  await element.sendKeys(searchTerm);
  await element.submit();
  await this.driver.wait(until.titleContains(searchTerm), 1000);
});

Then('I should see {string} in the results', async function (this: CustomWorld, searchTerm: string) {
  let bodyText = await this.driver.findElement(By.tagName('body')).getText();
});