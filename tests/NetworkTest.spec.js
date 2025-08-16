const {test,expect, request} = require('@playwright/test');

const {APIUtils} = require('./Utils/APIUtils');

const loginPayload = {userEmail: "santu9964@gmail.com", userPassword: "Santu@9964"};
const orderpayload = {orders: [{country: "cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};

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

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",  // * we provide because token can change instead we used *
     async route=>
      {
         //intersepting the response --> Api response --> {playwright fakes the response here } -->browser--> render data on front end
         
         const realResponse =await page.request.fetch(route.request());
         let body = JSON.stringify(fakePayLoadOrders); // converts javascript object to json because body is expecting json.
         route.fulfill(
            {
               realResponse,
               body
            });
      }
   );

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    
    const msg =await page.locator(".mt-4").textContent();
    console.log("No order msg is :: "+msg);

      

});


