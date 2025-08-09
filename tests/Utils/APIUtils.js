class APIUtils
{
    constructor(apicontext,loginPayload)
    {
        this.apicontext = apicontext;
        this.loginPayload = loginPayload;

    }

    async getToken()
    {
        const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: this.loginPayload
    })
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;

    console.log("The login token is ::"+token);

    return token;
    }

    async createorder(orderpayload)
    {
        let response ={};
        response.token = await this.getToken();
        const orderResponse =await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
              data: orderpayload,
              headers: {
                        'Authorization' : response.token,
                        'content-type'  : 'application/json'
              }
        })
        
           const orderresponseJson = await orderResponse.json();
           console.log(orderresponseJson);
          const orderid = orderresponseJson.orders[0];
           response.orderid = orderid;
           return response;
        
        
    }


}

module.exports = {APIUtils};