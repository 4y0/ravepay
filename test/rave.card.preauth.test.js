var preauth = require('../lib/rave.cardpreauth');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);


describe("#Rave Preauth service test", function(){

    var chargeResp, validationResp;
    var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", false);

    describe("#rave preauthorise card test", function(){
        it("shouldgive  a 200 response status", function(done){
            var ravebase = new base("FLWPUBK-7adb6177bd71dd43c2efa3f1229e3b7f-X", "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X", false);
            var preauthInstance = new preauth(ravebase);
            this.timeout(10000);
            var payload = {
                "PBFPubKey": "FLWPUBK-7adb6177bd71dd43c2efa3f1229e3b7f-X",
                "cardno": "5438898014560229",
                "charge_type": "preauth",
                "cvv": "812",
                "expirymonth": "08",
                "expiryyear": "20",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "user@example.com",
                "phonenumber": "08056552980",
                "firstname": "user",
                "lastname": "example",
                "IP": "40.198.14",
                "txRef": "MC-" + Date.now(),
                "redirect_url": "https://rave-web.herokuapp.com/receivepayment",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
            preauthInstance.preauth(payload).then(resp => {
                console.log("preauth transaction: ", resp.body);

                if (resp.statusCode == 200) {
                    done();
                }
            }).catch( function(err) {
                console.log(err.message.body);
                done(err);
            })
            //  expect(result).to.eventually.have.property('statusCode', '200').notify(done);
        })

        it("should return a an error message that property charge_type is required", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "cardno": "5399830213766064",
                "cvv": "825",
                "expirymonth": "08",
                "expiryyear": "17",
                "currency": "NGN",
                "pin": "9457",
                "country": "NG",
                "amount": "10",
                "email": "tester@flutter.co",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
            var result = preauthInstance.preauth(payload).catch(err => {
                return err.message;
            });
             expect(result).to.eventually.be.equal('charge_type is required').notify(done);
        })
    })

    describe("#rave void transaction test", function(){
        it("should return a void successful response", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29518",
                "action": "void",
                "SECKEY": "FLWSECK-c51891678d48c39eff3701ff686bdb69-X"
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body;
            });
             expect(result).to.eventually.have.deep.property('message', 'Refund or void complete').notify(done);
        })

        it("should return a success status in the data object from response.", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29518",
                "action": "void",
                "SECKEY": "FLWSECK-c51891678d48c39eff3701ff686bdb69-X"
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body.data;
            });
             expect(result).to.eventually.have.property('status', 'success').notify(done);
        })
    })

    describe("#Rave refund transaction test", function(){
        it("should return a refund complete message", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29508",
                "action": "refund",
                "SECKEY": "FLWSECK-c51891678d48c39eff3701ff686bdb69-X"
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body;
            });
             expect(result).to.eventually.have.deep.property('message', 'Refund or void complete').notify(done);
        })

        it("should return a success status in the data object from response.", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29508",
                "action": "refund",
                "SECKEY": "FLWSECK-c51891678d48c39eff3701ff686bdb69-X"
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body.data;
            });
             expect(result).to.eventually.have.property('status', 'success').notify(done);
        })
    })
})
