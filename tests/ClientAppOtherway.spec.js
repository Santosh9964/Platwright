const {test,expect} = require('@playwright/test');



test('page playwright test',async ({page})=>
{
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("santu9964@gmail.com");
   await page.locator("#userPassword").fill("Santu@9964");
      await page.locator("#login").click();

      // this will wait untill network completely loads
   //   await page.waitForLoadState('networkidle');

      // if above doesnt work for any reason use below code to wait
      await page.locator(".card-body b").first().waitFor();

     const titles= await page.locator(".card-body b").allTextContents();
     console.log(titles);
});

test.only('App Add to cart',async ({page})=>
{
   const email ="santu9964@gmail.com";
   const productName = "ADIDAS ORIGINAL";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Santu@9964");
  await page.getByRole("button",{name:'Login'}).click();
 // this will wait untill network completely loads
  await page.waitForLoadState('networkidle');
// if above doesnt work for any reason use below code to wait
  await page.locator(".card-body b").first().waitFor();

  await page.locator(".card-body").filter({hasText:"ADIDAS ORIGINAL"})
  .getByRole("button",{name: "Add To Cart"}).click();


   await page.getByRole("listitem").getByRole("button",{name: "Cart"}).click();

   await page.locator("div li").first().waitFor(); // this waitfor is used because below we used isVisible() it wont wait untill page load so.
   
   await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();

   await page.getByRole("button",{name:"Checkout"}).click();

   await page.getByPlaceholder("Select Country").pressSequentially("ind");

   await page.getByRole("button",{name:"Ind"}).nth(1).click();

   await page.getByText("PLACE ORDER").click();

   await expect(page.getByText("Thankyou for the order.")).toBeVisible();

      
        



});


