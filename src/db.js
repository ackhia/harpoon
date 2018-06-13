
import { MongoClient } from 'mongodb'
import assert  from 'assert'

const url = 'mongodb://root:example@localhost:27017'

const dbName = 'harpoon'
let client

export async function getDb() {
	client = await MongoClient.connect(url)
	return client.db(dbName)
	// if(db)
	// 	callback(db)
	// else {
	// 	MongoClient.connect(url, function(err, client) {
	// 		assert.equal(null, err);
	// 		console.log("Connected successfully to Mongo server")
	// 		clientInstance = client

	// 		db = client.db(dbName)
	// 		callback(db)
	// 	});
	// }
}

export function close() {
	if(client)
		client.close()
}