
var fee   = require('../services/rave.fee'); 
var banks = require('../services/rave.banks');

function Misc(RaveBase){


	this.getFee = function (data) {

		return fee(data, RaveBase)
		 
	}

	this.getBanks = function (){
		return banks(null, RaveBase);
	}



}
module.exports = Misc;