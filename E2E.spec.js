const{test, expect} = require ('@playwright/test');

test ('shopping cart E2E', async ({page})=>
{

    await page.goto('https://rahulshettyacademy.com/client/');
    
    console.log(await page.title());

    await expect(page).toHaveTitle("Let's Shop");

    await page.locator('#userEmail').fill("vinodlearning@gmail.com");
    await page.locator('#userPassword').fill("Mylearning@1");
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');
   // await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());

});

//--------------- Handling Static Select dropdown and Radio buttons --------------------------///

test ('Static dropdown', async ({page})=>
    {
      
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const dropdown =  page.locator("select.form-control");
        await dropdown.selectOption("consult");
        //await page.pause();

        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();

        const selectType = page.locator("option[value='consult']");
        await expect(selectType).toHaveText("Consultant");
        
        await expect (page.locator(".radiotextsty").last()).toBeChecked();

        //----------------------- Blinking text --------------------------------//

            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            const blinkLInk =  page.locator("a[href*='documents-request']");
            await expect(blinkLInk).toHaveAttribute("class","blinkingText");

    });
    
       
    //--------------------- Child Windlow Handle -----------------------------//
    



        test ('Child Windlow Handle', async ({browser})=>  
        {
           const context = await browser.newContext();
           const page   =  await context.newPage();

          await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
          const blinkLInk =  page.locator("a[href*='documents-request']");

            
            const [newPage]  = await Promise.all(
            [
            context.waitForEvent('page'),       // --> This listens to until the dom is - Pending, Rejected or FulFilled 
            blinkLInk.click(),
            ]) 

              const text = await (newPage.locator(".red").textContent());
              console.log(text);

        //------------ Split the String and get the desired Email adddress from texts -----//

            const splitText = text.split("@");
            const domain = splitText[1].split(" ") [0]
           // console.log(domain);  
            
              // Navigating back to Parent window UserName with the extracted string "rahulshettyacademy.com"   

             await  page.locator("#username").fill(domain);

            // await expect(page.locator("#username")).toHaveValue("rahulshettyacademy.com");

          
           console.log (await page.locator("#username").inputValue());
           
            });
        //-------------------- Navigate Forward & Back and validate the hidden elements ---------------------------------//

            test ("Hidden element", async ({page})=>
            {
            await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
            // await page.goto("https://www.google.com/");
            // await page.goBack();
            // await page.goForward();
            
            await expect (page.locator("#displayed-text")).toBeVisible();    
            await page.locator("#hide-textbox").click();
            await await expect (page.locator("#displayed-text")).toBeHidden();

         }); 


         //--------------- Handle Java alert popups and Mouse hover---------------------------//
         
        test("Java alert * Hover", async ({page})=>
        {
            await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
            await page.locator("#confirmbtn").click();
            await page.on('dialog', dialog => dialog.accept())

            await page.locator("#confirmbtn").click();
            await page.on('dialog', dialog => dialog.dismiss());

            await page.locator("#mousehover").hover();
            await page.locator("a[href='#top']").click();


             });

       //---------------- Handling child frames ---------------------------------//
       
       test (" child frames", async ({page})=>
       {
            await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
            const childFrame = page.frameLocator("#courses-iframe");
            await childFrame.locator("li a[href='lifetime-access']:visible").click();
            const subs = await childFrame.locator(".text h2").textContent();
            console.log(subs);
            console.log( subs.split(" ") [1]);
           

       });




        
                 




        



















