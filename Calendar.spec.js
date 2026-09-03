const{test, expect} = require ('@playwright/test');


test ("calendar validation", async ({page})=>

{

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();

    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();

    await page.getByText("2027").click();
    await page.locator(".react-calendar__year-view__months__month").nth(5).click();
    await page.locator("//abbr[text()='15']").click();



});