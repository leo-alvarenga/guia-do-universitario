const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },

    subtitle: {
        type: String
    },

    body: {
        type: String
    },

    cover: {
        type: String
    },

});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;