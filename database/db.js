
//const { MongoClient, ServerApiVersion } = require('mongodb');
var express = require('express');
var mongoose = require('mongoose');
const app = express();
require('dotenv').config({path:'../.env'}); // Load environment variables from .env file
const uri = `mongodb+srv://mouradbouabdallah96:${process.env.MONGODB_PASSWORD}@cluster0.zvd8rmw.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/*const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);*/
// connect to Mongo when the app initializes
mongoose.connect(uri);

// set up the RESTful API, handler methods are defined in api.js
var api = require('./api.js');
app.post('/message', api.post);
app.get('/message', api.list);

app.listen(3000);
console.log("Express server listening on port 3000");

