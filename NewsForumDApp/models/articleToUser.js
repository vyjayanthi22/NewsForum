var mongoose = require('mongoose');
const {Article}=require("./articles.js");
const {User} = require("./users.js");

const schema = mongoose.Schema({
    articleId : { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    userId :{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const ArticleToUser= mongoose.model("ArticleToUser", schema);
module.exports={ArticleToUser};

