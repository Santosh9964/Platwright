const {test,expect} = require('@playwright/test');


test('Browser context playwright test',async ({browser})=>
{
  // chrome-plugins/cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagepractise/");
  console.log(await page.title());
  
});

test('page playwright test',async ({page})=>
{
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test('@WebBrowser context-validation Error login',async ({browser})=>
{
  // chrome-plugins/cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  const username = page.locator("#username");
  const signin = page.locator("#signInBtn");
  const cardTitle = page.locator(".card-body a");

  await username.fill("rahulshetty");
  await page.locator("#password").fill("learning");
   await page.locator("#terms").click();
   await signin.click();
  let errormsg = await page.locator("[style*='block']").textContent();
  console.log("The login error msg is :: "+errormsg);
  await expect (page.locator("[style*='block']")).toContainText('Incorrect');

  await username.fill("");
  await username.fill("rahulshettyacademy");
  await signin.click();

  // if we have multiple elements
  console.log(await cardTitle.first().textContent());
  console.log(await cardTitle.nth(1).textContent());

  // to get all list of items

  const titles =await cardTitle.allTextContents();
  console.log(titles);

});

test('UI controls',async ({page})=>
{
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 const username = page.locator("#username");
 const signin = page.locator("#signInBtn");
 const dropdown = page.locator("select.form-control");
 const documentLink = page.locator("[href*='documents-request']");
 await dropdown.selectOption("consult");
 await page.locator(".radiotextsty").last().click();
 await page.locator("#okayBtn").click();
 console.log(await page.locator(".radiotextsty").last().isChecked());
 expect(await page.locator(".radiotextsty").last()).toBeChecked();
 await page.locator("#terms").click();
expect (await page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();
await expect(documentLink).toHaveAttribute("class","blinkingText");


  // await username.fill("rahulshetty");
  // await page.locator("#password").fill("learning");
  //  await page.locator("#terms").click();
  //  await signin.click();
 
});

test('child windows Handling',async ({browser})=>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

// promise.all is used when we need to perform some operations parallelley 

  const [newPage]= await Promise.all(
  [  
    context.waitForEvent('page'),  // listen for any new page in three state-- pending, rejected, fullfilled.
    documentLink.click()

  ])

   const  text = await newPage.locator(".red").textContent();
    console.log("The new page text is :: "+text);
    const arrayText=text.split("@");
    const domain=arrayText[1].split(" ")[0];
    console.log("After split is :: "+domain);

   await page.locator("#username").fill(domain); 

});



