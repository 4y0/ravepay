var base     = require('./lib/rave.base'); 
var card     = require('./lib/rave.card');
var account  = require('./lib/rave.account');
var token  = require('./lib/rave.token');
var status   = require('./lib/rave.status');
var mobile   = require('./lib/rave.mobile');
var misc     = require('./lib/rave.misc');


var Rave = function (public_key, public_secret, base_url_or_production_flag)
{

	var ravebase = new base(public_key, public_secret, base_url_or_production_flag);

	this.Card          = new card(ravebase);
	this.Status        = new status(ravebase);
	this.Account       = new account(ravebase);
	this.TokenCharge       = new token(ravebase);
	this.MobileOptions = new mobile(ravebase);
	this.Misc          = new misc(ravebase);

	this.getIntegrityHash = function (data) { return ravebase.getIntegrityHash(data); }

} 

module.exports = Rave;