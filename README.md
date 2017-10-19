# PayUMoney NodeJs Wrapper
The PayUMoney Node library provides convenient access to the PayUMoney API from applications written in server-side JavaScript.

### Documentation
See the [PayUMoney API docs](https://www.payumoney.com/dev-guide/apireference.html).

The package needs to be configured with your account's Merchant Key, Mecrhant Salt and Authorization Key, which are available in your [PayUMoney Dashboard][keys].
###Installation
Install the package with:
```
npm install payumoney-node --save
```

### Include and set keys
```javascript
var payumoney = require('payumoney-node');
payumoney.setKeys(MERCHANT_KEY, MERCHANT_SALT, AUTHORIZATION_HEADER);
```

### Set Mode
```javascript
payumoney.isProdMode(true); // production = true, test = false
```

### APIs Available
* [Create a payment request](#create_payment)
* [Get payment status](#get_payment_status)
* [Initiate refund](#initiate_refund)
* [Get refund status](#get_refund_status)

### <a name="create_payment"></a>Create new payment request
```javascript
var paymentData = {
    productinfo: "",
    txnid: "",
    amount: "",
    email: "",
    phone: "",
    lastname: "",
    firstname: "",
    surl: "", //"http://localhost:3000/payu/success"
    furl: "", //"http://localhost:3000/payu/fail"
};

payumoney.makePayment(paymentData, function(error, response) {
  if (error) {
    // Some error
  } else {
    // Payment redirection link
    console.log(response);
  }
});
```

### <a name="get_payment_status"></a>Get Payment Status
```javascript
payumoney.paymentResponse("txnid", function(error, response) {
  if (error) {
    // Some error
  } else {
    console.log(response);
  }
```

### <a name="intiate_refund"></a>Initiate refund
```javascript
payumoney.refundPayment("paymentId", "amount", function(error, response) {
  if (error) {
    // Some error
  } else {
    console.log(response);
  }
});
```

### <a name="get_refund_status"></a>Get refund status
```javascript
payumoney.refundStatus("paymentId", function(error, response) {
  if (error) {
    // Some error
  } else {
    console.log(response);
  }
});
```


---
### Submit issues
You can raise an issue in this repo or mail me at pwnkumar016@gmail.com


[keys]: https://www.payumoney.com/merchant/settings/#/myaccount


