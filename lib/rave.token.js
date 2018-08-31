
var chargeAccountToken = require('../services/rave.token.account.charge');
var chargeCardToken = require('../services/rave.token.card.charge');

function TokenCharge(RaveBase){


	this.card = function (data) {

		return chargeCardToken(data, RaveBase);

	}

	this.account = function (data) {

		return chargeAccountToken(data, RaveBase);

	}


}
module.exports = TokenCharge;