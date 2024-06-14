const { MongoClient, ServerApiVersion } = require("mongoose");
var fs = require('fs')

// Replace the placeholder with your Atlas connection string
const url = JSON.parse(fs.readFileSync('./credentialsServer.json', 'utf8'))

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url['mongoUrl'],  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

 