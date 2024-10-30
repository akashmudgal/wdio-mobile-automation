import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.ts';
import HomePage from '../pageobjects/home.page.ts';
import loginData from '../testdata/login.data.json';

Given(/^I am on the login page$/, () => {
    // do nothing
});

When(/^I login with (\w+)$/, async (inputType: string) => {
    const {username, password} = loginData[inputType];
    await LoginPage.login(username, password);
});

Then(/^I should see the correct error message for (.*)$/, async (inputType) => {
    const expectedMessage = loginData[inputType].expected_message;

    expect(LoginPage.errorMsg).toBeDisplayed();

    if(expectedMessage){
        if(inputType !== "standard_user")
            await expect(LoginPage.errorMsg).toHaveText(expectedMessage);
        else
            await expect(HomePage.btnMenu).toBeDisplayed();
    }
});

