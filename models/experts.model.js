const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');
const experts = new Schema({
    nome: String,
    formacao: String,
    telefone: String,
});
module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.experts, experts);