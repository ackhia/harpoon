
import dotenv from 'dotenv'
import { getDb, close } from './db'
import binance from './providers/binance'
import debug from './providers/debug'

dotenv.config()

function getProviders() {
	let providers
	if(process.env.DEBUG == "TRUE") 
		providers = [{ name: "debug", symbolsMethod: debug.getSymbols }]
	else
		providers = [{ name: "binance", symbolsMethod: binance.getSymbols }]

	return providers
}

function getNewPairs(exchangePairs, currentPairs) {
	let newPairs = exchangePairs.filter(p => currentPairs.indexOf(p) === -1)

	if(newPairs.length == 0 )
		console.log("No new pairs found")
	else
		console.log(newPairs)
}

async function main() {
	let db = await getDb()
	const exchanges = db.collection('exchanges')
	let providers = getProviders()

	for(const p of providers) {
		let doc = await exchanges.findOne({name: p.name})
		let symbols = await p.symbolsMethod()
		if(doc) {
			getNewPairs(symbols, doc.symbols)
		}
		else {
			await exchanges.insert({name: p.name, symbols: symbols })
		}
	}
	close()
}

main()
