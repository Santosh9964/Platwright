// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'process';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  timeout: 40 * 1000,
  expect:{
    timeout: 40* 1000,
  },

  reporter: 'html',

  projects:[
   {
    name: 'safari',
    use: {
  browserName: 'webkit',
  headless : false,
  screenshot : 'on',
  trace : 'on', //   retain-on-failure --only traces on failure...if u want forall just on
  ...devices['iPhone 11']  // selecting the device to run
}
},
{
  name : 'chrome',
  use: {
  browserName: 'chromium',
  headless : false,
  ignoreHttpsErrors: true,  // to ignore ssl certificate error
  Permissions: ['geolocation'], // to allow location permission while login
  screenshot : 'on',
  video: 'retain-on-failure', // video will capture only on failed tests.
  trace : 'on', //   retain-on-failure --only traces on failure...if u want forall just on
  viewport : {width: 720, height: 720}  // to adjust screen resolution
},
}
  ]

  
  
});

module.exports= config;

  
   
 
