const {test,expect, request} = require('@playwright/test');

const {APIUtils} = require('./Utils/APIUtils');

const loginPayload = {userEmail: "santu9964@gmail.com", userPassword: "Santu@9964"};
const orderpayload = {orders: [{country: "cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};

let response;

test.beforeAll( async () =>
{
   const apicontext = await request.newContext();
   const apiutils = new APIUtils(apicontext,loginPayload);
   response = await apiutils.createorder(orderpayload);

});

test.only('place the order',async ({page})=>
{
 // this code will set the local storage in application the token help to bypass login
    page.addInitScript(value =>{

        window.localStorage.setItem('token',value);
    }, response.token);

   await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

      const rows = await page.locator("tbody tr");
      const rowsCount = await rows.count();

      for(let i =0;i<rowsCount;i++)
      {
         const rowOrderId = await rows.nth(i).locator("th").textContent();
         if(response.orderid.includes(rowOrderId))
         {
            await rows.nth(i).locator("button").first().click();
            break;
         }
      }

      const OrderIdDetails =await page.locator(".col-text ").textContent();
      await page.pause();
      expect(response.orderid.includes(OrderIdDetails)).toBeTruthy();



});


