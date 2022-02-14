const MongoClient = require('mongodb').MongoClient;

let db = null;
let client = null;

const connect = async () => {
  client = await MongoClient.connect('mongodb://localhost'); // { useUnifiedTopology: true }
  db = client.db('shop');
};

const disconnect = async () => {
  await client.disconnect();
};

module.exports = {
  connect,
  disconnect,
  getDb: () => db
};