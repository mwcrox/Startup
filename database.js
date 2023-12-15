const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const { json } = require('express');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('connect4');
const scoreCollection = db.collection('score');
//scoreCollection.insertMany({"Name": localStorage.getItem('userName') ?? 'Mystery Player', "Score": Math.random, "Date": new Date().toLocaleDateString()});
// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addScore(score) {
  const result = await scoreCollection.insertOne(score);
  return result;
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = { addScore, getHighScores };
