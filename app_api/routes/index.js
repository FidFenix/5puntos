var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

router.get('/posts', ctrlLocations.postsList);
router.post('/posts', ctrlLocations.postsCreate);
router.get('/posts/:postid', ctrlLocations.postsReadOne);
router.put('/posts/:postid', ctrlLocations.postsUpdateOne);
router.delete('/posts/:postid', ctrlLocations.postsDeleteOne);

// reviews
router.post('/posts/:postid/reviews', ctrlReviews.reviewsCreate);
router.get('/posts/:postid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/posts/:postid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/posts/:postid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
