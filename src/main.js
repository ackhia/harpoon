
import { getDb, close } from './db'
import binance from './providers/binance'
import bithumb from './providers/bithumb'
import debug from './providers/debug'

function getProviders() {
	let providers = [ { name: "binance", symbolsMethod: binance.getSymbols },
					  { name: "bithumb", symbolsMethod: bithumb.getSymbols },
					  { name: "debug", symbolsMethod: debug.getSymbols }]

	return providers
}

function getNewPairs(exchangePairs, currentPairs) {
	let newPairs = exchangePairs.filter(p => currentPairs.indexOf(p) === -1)
	return newPairs
}

async function logNewPairs(db, exchange, newPairs) {
	let timestamp = Math.round((new Date()).getTime() / 1000);
	for(const p of newPairs) {
		await db.collection('new-pairs').insert({exchange: exchange, pair: p, timestamp: timestamp})	
	}
}

async function main() {
	try {
		let db = await getDb()
		const exchanges = db.collection('exchanges')
		let providers = getProviders()

		for(const p of providers) {
			let doc = await exchanges.findOne({name: p.name})
			let symbols = await p.symbolsMethod()
			
			if(doc) {
				let newPairs = getNewPairs(symbols, doc.symbols)

				logNewPairs(db, p.name, newPairs)
				await exchanges.update({name: p.name}, {name: p.name, symbols: symbols })
			}
			else {
				await exchanges.insert({name: p.name, symbols: symbols })
			}
		}		
	}
	catch(err) {
		console.log("Error occured: ", err)
	}
	finally {
		close()
	}
}

main()

/*(async () => {
	console.log(await bithumb.getSymbols())
})()*/

