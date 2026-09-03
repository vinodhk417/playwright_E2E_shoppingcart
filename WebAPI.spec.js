     const { test,expect, request }=  require ('@playwright/test')
       const loginPayload =  {userEmail: "vinodlearning@gmail.com", userPassword: "Mylearning@1"}

     let token;

     test.beforeAll( async ()=>
     {
            const apiContext = await request.newContext();
            const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
              {
              data:loginPayload
              })
              expect(loginResponse.ok()).toBeTruthy();
            const loginResponseJson = await loginResponse.json();
            token = loginResponseJson.token;
             console.log(token);   



     });


     test ('shopping cart E2E using api login', async ({page})=>
    {
       await page.addInitScript (value =>
       {
          window.localStorage.setItem('token',value);
       }, token);
     await page.goto('https://rahulshettyacademy.com/client/');
     const products = page.locator(".card-body b");
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[class='btn w-10 rounded']").first().waitFor();
    const cardtitles =  await page.locator(".card-body b").allTextContents();
    console.log(cardtitles);

    const counts = await  products.count();
    await console.log(counts);

    //const productName = "ADIDAS ORIGINAL";

      

    for (let i=0; i<counts ; ++i)
    {
        await page.locator('.card-body', { hasText: 'ADIDAS ORIGINAL' })
        .locator('button:has-text("Add To Cart")').click();
        break;
    }
  
       await page.locator("[routerlink*='cart']").click();
      const bool = (await page.locator('h3', { hasText: 'ADIDAS ORIGINAL' })).isVisible();
      expect(bool).toBeTruthy();

        await page.locator("text= Checkout").click();

        await page.locator("div input[class='input txt']").first().fill('123');
        await page.locator("div input[class='input txt']").last().fill('Vinodh Kombanda');
        
        //const coupon =  await page.locator("input[name='coupon']").fill('rahulshettyacademy');
       // await page.locator("button[type='submit']").click();
       // expect (await page.locator("div p[class*='mt-1']")).toHaveText('* Coupon Applied');

        
        
      await page.locator("input[placeholder='Select Country']").pressSequentially('ind',{delay:100});

       // await page.getByRole('button',{name: ' India'}).nth(1).click();
        
        await page.locator(".ta-results").filter({hasText: 'India'}).isVisible();

        await page.locator(".ta-results").filter({hasText: 'India'}).click();

        //  expect(await page.locator(".user__name label")).toHaveText(email);

            await page.locator(".btnn").click();

          expect( await page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ');

          

         const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

         console.log(orderId);

        await page.locator("button[routerlink*='myorders']").click();

       // await page.locator(".table-responsive").filter({hasText: '697cfeb2c941646b7ac73839'}).isVisible();

        await page.locator("tbody tr").filter({hasText: '69b8af10f86ba51a650aac0c'}).locator("td button[class*='btn-primary']").click();

        expect(await page.locator(".col-text")).toHaveText('69b8af10f86ba51a650aac0c');

        







});



     