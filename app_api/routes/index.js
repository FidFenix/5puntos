var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/posts');
var ctrlReviews = require('../controllers/reviews');

router.get('/posts', ctrlPosts.postsList);
router.post('/posts', ctrlPosts.postsCreate);
router.get('/posts/:postid', ctrlPosts.postsReadOne);
router.put('/posts/:postid', ctrlPosts.postsUpdateOne);
router.delete('/posts/:postid', ctrlPosts.postsDeleteOne);

// reviews
router.post('/posts/:postid/reviews', ctrlReviews.reviewsCreate);
router.get('/posts/:postid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/posts/:postid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/posts/:postid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
