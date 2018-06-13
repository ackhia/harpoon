
import { getDb, close } from './db'
import { getSymbols } from './providers/binance'

const providers = [{ name: "binance", symbolsMethod: getSymbols }]
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
