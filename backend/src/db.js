const mongoose = require("mongoose");
var fs = require('fs')

const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect("mongodb://mongo:27017/SocialMedia", options)
.then(() => {console.log("Connected to DB")},)
.catch(err => {console.log(err)})