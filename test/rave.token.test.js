var card = require('../lib/rave.card');
var TokenCharge = require('../lib/rave.token');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("#Rave Token Card Charge Test", function(){

    var chargeResp, validationResp;

    var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", false);
    var cardInstance = new card(ravebase);
    var tokenCharge = new TokenCharge(ravebase);

    describe("# Rave Charge leg test", function() {
         it("should return a 200 status response", function(done) {
             this.timeout(10000);
            var payload = {
                "cardno": "5438898014560229",
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "21",
                "currency": "NGN",
                "pin": "7552",
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


            chargeResp=[];
            cardInstance.charge(payload).then(resp => {
                chargeResp = resp;
                if (resp.statusCode == 200) {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
    });

        it("should return a pending validation response", function(done){
            this.timeout(10000);
            if (chargeResp.body.data.chargeResponseCode == 02) {
                done();
            }
  
        })

        it("should throw error email is required", function(done) {
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "https://ravesandboxapi.flutterwave.com");
            var cardInstance = new card(ravebase);
            var payload = {
                "cardno": "5438898014560229",
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "21",
                "currency": "NGN",
                "pin": "7552",
                "suggested_auth": "PIN",
                "country": "NG",
                "amount": "10",
                "email": "",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            } 

            var result = cardInstance.charge(payload).catch(err => {
                return err.message;
            })

            expect(result).to.eventually.be.equal("email is required").notify(done);
        })
    })
    // END OF CARD CHARGE TEST
    describe("#Rave Validation leg test", function(){
        it("should return a 200 response", function(done){
            this.timeout(10000);
            var payload2 = {
                "transaction_reference": chargeResp.body.data.flwRef,
                "otp": "12345"
            }
            
            validationResp=[];
            cardInstance.validate(payload2).then(resp => {
                validationResp = resp;
                if (validationResp.statusCode == 200) {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
        })
        it("should return a charge response code of 00", function(done){
            this.timeout(10000);
            if (validationResp.body.data.tx.chargeResponseCode == 00) {
                done();
            } 
        })
    })
    // END OF VALIDATE CHARGE TEST
    describe("#Rave Token Payment leg test", function(){
        var tokenResp
        it("should return a 200 response", function(done){
            this.timeout(10000);
            var payload = {
                "token": validationResp.body.data.tx.chargeToken.embed_token,
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "21",
                "currency": "NGN",
                "pin": "7552",
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
            
            tokenResp=[];
            tokenCharge.card(payload).then(resp => {
                tokenResp = resp;
                if (tokenResp.statusCode == 200) {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
        })
        it("should return a charge response code of 00", function(done){
            this.timeout(10000);
            if (tokenResp.body.data.chargeResponseCode == 00) {
                done();
            } 
        })
    })
    // END OF TOKEN CHARGE TEST
})

