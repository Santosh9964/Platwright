const base  = require('@playwright/test');

exports.customtest = base.test.extend(
{
    testDataforOrder : {
    username : "santu9964@gmail.com",
    password : "Santu@9964",
    productName : "ZARA COAT 3"
}
}
 )