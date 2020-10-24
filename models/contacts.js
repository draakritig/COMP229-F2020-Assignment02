let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String
},
{
    collection: "lists"
});
module.exports = mongoose.model('List', contactModel)