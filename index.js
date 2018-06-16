var request = require('request'),
    sha512 = require('js-sha512');

var payment_url = {
    'prod': 'https://secure.payu.in/',
    'test': 'https://sandboxsecure.payu.in/'
};

var rest_url = {
    'prod': "https://www.payumoney.com/",
    'test': 'https://test.payumoney.com/'
};

var API = {
    'makePayment': '_payment',
    'paymentResponse': 'payment/op/getPaymentResponse?',
    'refundPayment': 'payment/merchant/refundPayment?',
    'refundStatus': 'treasury/ext/merchant/getRefundDetailsByPayment?',
};

module.exports = {
    headers: {
        'authorization': 'YOUR-AUTHORIZATION-HEADER' //will be provided by payumoney
    },

    credentails: {
        'merchant-key': 'YOUR-MERCHANT-KEY', //will be provided by payumoney
        'merchant-salt': 'YOUR-SALT-KEY', //will be provided by payumoney
        'service_provider': 'payu_paisa' //do not modify
    },

    mode: 'test',

    isProdMode: function(mode) {
        if (mode) {
            this.mode = 'prod';
        } else {
            this.mode = 'test';
        }
    },

    setKeys: function(key, salt, authorization) {
        this.credentails.key = key;
        this.credentails.salt = salt;
        this.headers.authorization = authorization;
    },

    makePayment: function(data, callback) {
        var hashData = { preHashString: this.credentails.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|||||||||||' };
        var hash = sha512(hashData.preHashString + this.credentails.salt);
        var payuData = {
            key: this.credentails.key,
            salt: this.credentails.salt,
            service_provider: 'payu_paisa',
            hash: hash
        };
        var params = Object.assign(payuData, data);
        request.post(payment_url[this.mode] + API.makePayment, { form: params, headers: this.headers }, function(error, response, body) {
            if (!error) {
                var result = response.headers.location;
                callback(error, result);
            }
        });
    },

    paymentResponse: function(txnid, callback) {
        var params = {
            merchantKey: this.credentails.key,
            merchantTransactionIds: txnid
        };
        request.post(rest_url[this.mode] + API.paymentResponse, { form: params, headers: this.headers }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                callback(error, result.result);
            }
        });
    },

    refundPayment: function(paymentId, amount, callback) {
        var params = {
            merchantKey: this.credentails.key,
            paymentId: paymentId,
            refundAmount: amount
        };
        request.post(rest_url[this.mode] + API.refundPayment, { form: params, headers: this.headers }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                callback(error, result);
            }
        });
    },

    refundStatus: function(paymentId, callback) {
        request.get(rest_url[this.mode] + API.refundStatus + 'merchantKey=' + this.credentails.key + '&paymentId=' + paymentId, { headers: this.headers }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                callback(error, result);
            }
        });
    }
};