  const {test} = require('@playwright/test');
  

  test ('Find the locator by Label', async ({page})=>
  {
      await page.goto('https://rahulshettyacademy.com/angularpractice/');

      await page.getByLabel("Check me out if you Love IceCreams!").click();
      await page.getByLabel("Employed").check();
      await page.getByLabel("Gender").selectOption("Female");
      await page.getByText("The Form has been submitted successfully!.").isVisible();
      await page.getByPlaceholder("Password").fill('1235764');
      await page.getByRole("button", {name: 'Submit'}).click();
      await page.getByRole("link", {name: 'Shop'}).click();
      await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();


  })