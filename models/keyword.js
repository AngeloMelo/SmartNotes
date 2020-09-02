const mongoose = require('mongoose');

const keywordSchema = mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

const Keyword = module.exports = mongoose.model('keywords', keywordSchema);

module.exports.add = function(keyword,callback){
    Keyword.create(keyword, callback);
}

module.exports.getKeywords = function(callback, limit){
    Keyword.find(callback).limit(limit);
}