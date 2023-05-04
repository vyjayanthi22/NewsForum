var mongoose = require('mongoose');

const articleSchema=mongoose.Schema({
    title:  { type: String, required: true },
    content:  { type: String, required: true },
    validated:  Boolean
})

const Article = mongoose.model('Article', articleSchema);
module.exports = {Article};