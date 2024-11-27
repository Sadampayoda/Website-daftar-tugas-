const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function connectMongoDb() {
    await client.connect();
    return client.db("daftar-tugas");
}

module.exports = {connectMongoDb};
