var mongoose = require('mongoose');
var Schema = mongoose.Schema

var setting = new Schema({
    server_name:String,
    test1:String,
});

module.exports = mongoose.model('server_settings',setting);