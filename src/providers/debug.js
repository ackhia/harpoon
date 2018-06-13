

import fs from 'fs'

export default {getSymbols: function() {
	return new Promise(function(resolve, reject) {
		fs.readFile('data/pairs.json', 'utf8', function (err, data) {
			if (err) {
				reject('Could not read debug pairs file')
			}			
			else {
				var obj = JSON.parse(data);
				resolve(obj)
			}   
		});
	})
}}