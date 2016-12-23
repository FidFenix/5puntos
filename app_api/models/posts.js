var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    reviewText: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reviews: [reviewSchema]
});

mongoose.model('Post', postSchema);
