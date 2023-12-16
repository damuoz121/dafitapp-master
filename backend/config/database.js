const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dafit.agqn2nd.mongodb.net/${process.env.DB_NAME}`

mongoose.connect(URI, {useNewUrlParser: true}).then(() => console.log('database connecte succesfull!'));;

module.exports = mongoose


