
var request = require('request');

const baseUrl = 'https://api.binance.com'

export default {getSymbols: function() {
	return new Promise(function(resolve, reject) {
		request.get({url: baseUrl + '/api/v1/exchangeInfo', 
		json: true}, 
		(err, res, data) => {
		   if (err) {
			   reject(err)
		   } else if (res.statusCode !== 200) {
			   reject('Status:' + res.statusCode)
		   } else {
			   let btcSymbols = data.symbols.filter(s => s.quoteAsset == 'BTC')
											.map(s =>  s.baseAsset + '/' + s.quoteAsset )
				resolve(btcSymbols)
		   }
	   })
	})
}}