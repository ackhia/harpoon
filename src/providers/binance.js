
var request = require('request');

const baseUrl = 'https://api.binance.com'

export function getSymbols() {
	return new Promise(function(resolve, reject) {
		request.get({url: baseUrl + '/api/v1/exchangeInfo', 
		json: true}, 
		(err, res, data) => {
		   if (err) {
			   console.log('Error:', err)
			   reject(err)
		   } else if (res.statusCode !== 200) {
			   console.log('Status:', res.statusCode);
			   reject('Status:' + res.statusCode)
		   } else {
			   let btcSymbols = data.symbols.filter(s => s.quoteAsset == 'BTC')
											.map(s =>  s.baseAsset + '/' + s.quoteAsset )
				resolve(btcSymbols)
		   }
	   }
)
	});
}