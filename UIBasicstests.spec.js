const {test, expect} = require('@playwright/test');


test ('Browser context Playwright Test', async ({browser})=>
{
        	const context = await browser.newContext();            
        	const page = await context.newPage();  
            await page.goto("https://rahulshettyacademy.com/");
             console.log(await  page.title());            
          await  expect(page).toHaveTitle("Rahul Shetty Academy | Master AI & Automation Testing");                       

 }); 

    test ('Page context Playwright Test', async ({page})=>
    {
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
           //  console.log( await page.title());
             await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

         await  page.locator("#username").fill('vinodh');
         await  page.locator("#password").fill('learning');
         await  page.locator("#signInBtn").click();

         console.log(await page.locator("div[style*='block']").textContent());
        await expect(page.locator("div[style*='block']")).toContainText("Incorrect username/password.");
         await  page.locator("#username").fill('rahulshettyacademy');
         await  page.locator("#password").fill('learning');
         await  page.locator("#signInBtn").click();
         


});
