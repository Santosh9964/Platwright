const {test,expect} = require('@playwright/test');
let webcontext;

test.beforeAll(async({browser})=>
{
    const context =await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("santu9964@gmail.com");
    await page.locator("#userPassword").fill("Santu@9964");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
// storage state method stores all the login cookies in state.json file, later we can use that file to login.
    await context.storageState({path: 'state.json'});
    webcontext = await browser.newContext({storageState: 'state.json'});


});

test('App Add to cart',async ()=>
{
   const email ="santu9964@gmail.com";
   const productName = "ADIDAS ORIGINAL";
   const page = await webcontext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const products = page.locator(".card-body");
   await page.locator(".card-body b").first().waitFor();
  const titles= await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();

  for(let i =0; i< count; i++)
  {
    if(await products.nth(i).locator("b").textContent() === productName)
    {
        await products.nth(i).locator("text = Add To Cart").click();
        break;
    }
  }

   await page.locator("[routerlink*= 'cart']").click();
   await page.locator("div li").first().waitFor(); // this waitfor is used because below we used isVisible() it wont wait untill page load so.
   const bool =await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
   console.log("The cart is visible :: "+bool);
   await expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount =await dropdown.locator("button").count();
   for(let i =0;i< optionsCount ;i++)
   {
      const text =await dropdown.locator("button").nth(i).textContent();
      if(text === " India")
      {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
      expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
      await page.locator(".action__submit ").click();
      await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
      const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
      console.log("The order id is :: "+orderId);

      await page.locator("button[routerlink*='myorders']").click();

      await page.locator("tbody").waitFor();

      const rows = await page.locator("tbody tr");
      const rowsCount = await rows.count();

      for(let i =0;i<rowsCount;i++)
      {
         const rowOrderId = await rows.nth(i).locator("th").textContent();
         if(orderId.includes(rowOrderId))
         {
            await rows.nth(i).locator("button").first().click();
            break;
         }
      }

      const OrderIdDetails =await page.locator(".col-text ").textContent();
      expect(orderId.includes(OrderIdDetails)).toBeTruthy();



});

test('Testcase 2',async ()=>
{
   const email ="santu9964@gmail.com";
   const productName = "ADIDAS ORIGINAL";
   const page = await webcontext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const products = page.locator(".card-body");
   await page.locator(".card-body b").first().waitFor();
  const titles= await page.locator(".card-body b").allTextContents();
  console.log(titles);

});


