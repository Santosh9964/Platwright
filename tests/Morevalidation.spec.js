const {test,expect} = require('@playwright/test');
const path = require('path');



test('popup Validations',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

          page.locator("#confirmbtn").click();
    await page.on('dialog',dialog => dialog.accept());

    await page.locator("#mousehover").hover();

    const framepage= page.frameLocator("#courses-iframe");  // swithching to frame
   await  framepage.locator("li a[href*='lifetime-access']:visible").click(); // here we have 2 elements one is hidden so used visible
   const textcheck =await framepage.locator(".text h2").textContent();
   console.log(textcheck.split(" ")[1]);

});

test('Screen shot & Visual comparision',async ({page})=>
{
      await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'elementscreenshot.png'});  // partial screen shot of that element
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'}); // page screenshot
    await expect(page.locator("#displayed-text")).toBeHidden();

});

test.only('Visual testing',async ({page})=>
{
      await page.goto("https://www.flightaware.com/");
      expect(await page.screenshot()).toMatchSnapshot('landing.png');

});