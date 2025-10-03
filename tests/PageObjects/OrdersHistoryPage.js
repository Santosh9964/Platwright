class OrdersHistoryPage
{
constructor(page)
{
    this.page = page;
this.ordersTable = page.locator("tbody");
this.rows = page.locator("tbody tr");
this.orderdIdDetails =page.locator(".col-text");
this.orderbutton = page.locator("button[routerlink*='myorders']");
}
async searchOrderAndSelect(orderId)
{
    await this.orderbutton.click();
    await this.ordersTable.waitFor();
for(let i =0; i<await this.rows.count(); ++i)
 {
    const rowOrderId =await this.rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId))
    {
        await this.rows.nth(i).locator("button").first().click();
        break;
    }
 }

}

async getOrderId()
{
    return await this.orderdIdDetails.textContent();
}

}
module.exports = {OrdersHistoryPage};
