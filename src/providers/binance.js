
var request = require('request');

const baseUrl = 'https://api.binance.com'

export function getSymbols(callback) {
	request.get({url: baseUrl + '/api/v1/exchangeInfo', 
				 json: true}, 
				 (err, res, data) => {
					if (err) {
						console.log('Error:', err);
					} else if (res.statusCode !== 200) {
						console.log('Status:', res.statusCode);
					} else {
						let btcSymbols = data.symbols.filter(s => s.quoteAsset == 'BTC').map(s =>  s.baseAsset + '/' + s.quoteAsset )
						callback(btcSymbols)
					}
				}
	)
}