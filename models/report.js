const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    keywords: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Keyword"
        }
    ],
    create_date:{
        type: Date,
        default: Date.now
    }
});

const Report = module.exports = mongoose.model('reports', reportSchema);

module.exports.getReports = function(callback, limit){
    Report.find(callback).limit(limit);
}
