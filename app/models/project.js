var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProjectSchema   = new Schema({
    name: String,
    github_url:String,
    technologies:[{}]
});

module.exports = mongoose.model('Project', ProjectSchema);
