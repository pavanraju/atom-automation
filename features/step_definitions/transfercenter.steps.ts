import { Then, When } from "@cucumber/cucumber";
import CustomWorld from "../../src/CustomWorld";
import TransferCenterPage from "../../src/pages/TransferCenterPage";

const transferCenterPage: TransferCenterPage = new TransferCenterPage();

Then('transfer center page should be displayed', async function (this: CustomWorld) {
    await transferCenterPage.waitForDomainPageIsLoaded(this);
});

Then('verify purchased domain {string} in the domain transfer center', async function (this: CustomWorld, domain: string) {
    await transferCenterPage.verifyDomainNameExists(this, domain);
});

When('i click on the view details of the purchased domain {string}', async function (this: CustomWorld, domain: string) {
    await transferCenterPage.clickOnViewDetailsForaDomain(this, domain);
});

Then('domain details page should be displayed', async function (this: CustomWorld) {
    await transferCenterPage.verifyDomainDetailsPageIsLoaded(this);
});

Then('verify status of purchased domain {string} in the domain details page', async function (this: CustomWorld, domain: string) {
    await transferCenterPage.verifyDomainAndPurchasedStatus(this, domain);
});