const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorsSchema = new Schema({
    nome: String,
    nacionalidade: String,
    empresa: String
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsors, sponsorsSchema);