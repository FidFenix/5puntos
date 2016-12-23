var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/posts');

/* Locations pages */
router.get('/', ctrlOthers.angularApp);
router.get('/post/:postid', ctrlPosts.postInfo);
router.get('/post/:postid/review/new', ctrlPosts.addReview);
router.post('/post/:postid/review/new', ctrlPosts.doAddReview);

module.exports = router;
