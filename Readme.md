# Ravepay Nodejs Library v1.0.0

## Ravepay Services exposed by the library

- Account Charge 
- Card Charge
- USSD Charge
- Fees
- Banks

For more information on the services listed above, visit the [Ravepay website](https://ravepay.co)

## How to use

`npm install ravepay`


 You can get your PUBLICK_KEY and SECRET_KEY from the ravepay dashboard. Go [here](https://ravepay.com/auth/) if you don't have an account.
 
 ## Initializing RavePay object

> To initialize ravePay object, use:

```
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);
```

If you pass true as the value for PRODUCTION_FLAG, the library will use the production url as the base for all calls. Otherwise it will use the staging base url;

```
var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG); //Base url is 'http://flw-pms-dev.eu-west-1.elasticbeanstalk.com'

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, true); //Base url is 'http://api.ravepay.co'

```

### RavePay object constructor options:

* PUBLICK_KEY: This is a string that can be found in merchant rave dashboard
* SECRET_KEY: This is a string that can be found in merchant rave dashboard
* PRODUCTION_FLAG: This could be a string or boolean. If set to true ravePay will be initialized with production url, otherwise it will be initialized with staging url. This can also be a string. `PRODUCTION_FLAG` can be set as string by setting it as staging url or production url.


## Card Charge
To charge a card, construct an object with the payment details and pass to `ravePay Card charge` method. A sample object with required details for card charge is shown below.

```
var payload = {
            "cardno": "5438898014560229",
            "cvv": "789",
            "expirymonth": "07",
            "expiryyear": "18",
            "currency": "NGN",
            "pin": "7552",
            "country": "NG",
            "amount": "10",
            "email": "user@example.com",
            "phonenumber": "1234555",
            "suggested_auth": "PIN",
            "firstname": "user1",
            "lastname": "user2",
            "IP": "355426087298442",
            "txRef": "MC-7663-YU",
            "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
};
```

| Property        | Description           
| ------------- |:-------------:|
| amount      | This is the amount to be charged from card/account.| 
| country      | This is the route country for the transaction with respect to the currency.|   
| currency | This is the specified currency to charge the card in.| 
| email      | This is the email address of the customer.| 
| firstname      | This is the first name of the card holder or the customer.|   
| lastname | This is the last name of the card holder or the customer.| 
| txRef      | This is the unique reference, unique to the particular transaction being carried out. It is generated by the merchant for every transaction| 
| suggested_auth      | This is the authorization method that will be used for charge. In this particular sample, we are using pin method which require we pass the 4 digit pin of the card.For more information on this, and other authentication type, check here https://flutterwavedevelopers.readme.io/v1.0/reference#rave-direct-charge|   
| Phonenumber | This is the phone number of the card holder.| 
| cardno      | Debit card number| 
| cvv      | Three digit security code on the back of the card|   
| expirymonth | Card expiry month.| 
| expiryyear      | Debit card number| 
| pin      | 4 digit pin| 
| IP | IP - Internet Protocol. This represents the IP address of where the transaction is being carried out.|
 


> With the payload set, call rave card charge method:

```

var payload = {
            "cardno": "5438898014560229",
            "cvv": "789",
            "expirymonth": "07",
            "expiryyear": "18",
            "currency": "NGN",
            "pin": "7552",
            "country": "NG",
            "amount": "10",
            "email": "user@example.com",
            "phonenumber": "1234555",
            "suggested_auth": "PIN",
            "firstname": "user1",
            "lastname": "user2",
            "IP": "355426087298442",
            "txRef": "MC-7663-YU",
            "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
};


 rave.Card.charge(payload).then(resp => {
   //Get the ref of the card charge from response body. This will be used to validate the transaction
  })
  .catch(err => {
    //Handle error
  })
  
  
//On successful charge, validate the transaction to complete the payment

var payload = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "transaction_reference": ref,
                "otp": ""
                }
We create a payload with public key, and transaction ref obtained from charge response.
  rave.Card.validate(payload).then(resp => {
      return resp.body;
  })
    .catch(err => {
      //Handle error
    })

```

> A complete code can be found here:

```
Promise.all([
  rave.Card.charge(payload).then(resp => {
    var response;
    if(resp.body && resp.body.data && resp.body.data.flwRef){
      response = resp.body.data.flwRef;
    } else{
      response = new Error("Couldn't get response, this is being fixed");
      throw response;
    }

    return response;
  })
  .catch(err => {
    console.log("P: ",err.message);
  })
]).spread(ref => {
  console.log("this is ref: ",ref);
  var payload2 = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "transaction_reference": ref,
                "otp": "12345"
                }
  rave.Card.validate(payload2).then(resp => {
      return resp.body;
  })
    .catch(err => {
      console.log("got this error: ",err.message);
    })
})
```


## Bank Account Charge
To charge a bank account, construct an object with the payment details and pass to `ravePay bank charge` method. A sample object with required details for bank charge is shown below.

```
var payload = {
                "accountnumber": "0690000004",
                "accountbank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "10",
                "email": "user@example.com",
                "phonenumber": "1234555",
                "firstname": "first name",
                "lastname": "last name",
                "IP": "355426087298442",
                "txRef": "",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
};
```

| Property        | Description           
| ------------- |:-------------:|
|accountnumber |Account number of the account to be charged|
|accountbank |code for the bank of the account.Make use of the Get Bank list function|
|currency  |This is the specified currency to charge the card in.|
|amount  |This is the amount to be charged from card/account.|
|country  |This is the route country for the transaction with respect to the currency.|
|email  |This is the email address of the customer.|
|firstname  |This is the first name of the card holder or the customer.|
|lastname  |This is the last name of the card holder or the customer.|
|phonenumber |This is the phone number of the card holder.|
| IP | IP - Internet Protocol. This represents the IP address of where the transaction is being carried out.|



> With the payload set, call rave account charge method:

```
var payload3 = {
                "accountnumber": "0690000004",
                "accountbank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "10",
                "email": "user@example.com",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
};
```

```
rave.Account.charge(payload3).then(resp => {
  resp.body;
})
.catch(err => {
  //Handle error
})
```

## Preauthorisation

### Preauth:
```
rave.Preauth.preauth(payload4).then(resp => {
  console.log("Preauth response: "+resp.body);
})
.catch(err => {
  console.log("preauth error: "+ err.message);
})

```

### Void

```
rave.Preauth.void(payload).then(resp => {
  // work with response
})
.catch(err => {
  // handle error
})
```

### Refund

```
rave.Preauth.refund(payload).then(resp => {
  // work with response
})
.catch(err => {
  // handle error
})
```

### Capture
```
rave.Preauth.captureCard(payload).then(resp => {
  // work with response
})
.catch(err => {
  // handle error
})
```


## Integrity Checksum
To compute the hash for your payment request parameters:

```
var hash = rave.getIntegrityHash(payload4);
```


## Get List of Banks
```
rave.Misc.getBanks().then(resp => {
  console.log("got this response for banks: ", resp.body);
})
```

> Returns a response that looks like this:

```
[
    {
        "bankname": "ACCESS BANK NIGERIA",
        "bankcode": "044",
        "internetbanking": false
    },
    {
        "bankname": "GTBANK PLC",
        "bankcode": "058",
        "internetbanking": false
    },
    {
        "bankname": "FIRST BANK PLC",
        "bankcode": "011",
        "internetbanking": true
    },
    {
        "bankname": "ZENITH BANK PLC",
        "bankcode": "057",
        "internetbanking": false
    },
    {
        "bankname": "DIAMOND BANK PLC",
        "bankcode": "063",
        "internetbanking": true
    },
    {
        "bankname": "UNITY BANK PLC",
        "bankcode": "215",
        "internetbanking": false
    },
    {
        "bankname": "FIRST CITY MONUMENT BANK PLC",
        "bankcode": "214",
        "internetbanking": false
    }
]
```


## Status of Transaction:

### Requery

```
rave.Status.requery(payload)
.then(resp => {
	// response here
})
.catch(err => {
})

Sample Payload:

{
	"flw_ref": "FLW1299393H" (optional, processor reference)
}
```


### xrequery

```
rave.status.xrequery(payload)
.then(resp => {

})
.catch(err => {

})

Sample payload:

{
	"tx_ref": "rave-1238383",(optional)
	"flw_ref": "FLW1299393H", (optional processor reference)
 	"last_attempt": "1", (optional, if set to true[1] we return only the last attempt, used when querying with tx_ref).
	"only_successful": "1" (optional, if set to true[1] we return only successful transaction for that ref, used wehn querying with tx_ref.)
}
```
