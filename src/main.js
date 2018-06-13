
import { getDb, close } from './db'
import { getSymbols } from './providers/binance'

const providers = [{ name: "binance", symbolsMethod: getSymbols }]
function getNewPairs(newPairs, currentPairs) {
	console.log(newPairs, currentPairs)
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
		close()
	}
}

main()
