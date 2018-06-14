var request = require('request');

const baseUrl = 'https://api.bithumb.com'

export default {getSymbols: function() {
	return new Promise(function(resolve, reject) {
		request.get({url: baseUrl + '/public/ticker/ALL', 
		json: true}, 
		(err, res, data) => {
		   if (err) {
			   reject(err)
		   } else if (res.statusCode !== 200) {
			   reject('Status:' + res.statusCode)
		   } else {
			   let btcSymbols = Object.keys(data.data)
			   						  .filter(s => s != 'date')
									  .map(s =>  s + '/KRW')
				resolve(btcSymbols)
		   }
	   })
	})
}}