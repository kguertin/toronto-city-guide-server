const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");

const URI = "mongodb+srv://toronto-guide:labs2020@cluster0-y2rr0.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const client = new MongoClient(URI);

client.connect()
.then(app.listen(8008, () => console.log("Listening on PORT 8008")));