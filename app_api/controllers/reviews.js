var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*Postean un nuevo Review con nombre del Post */
/* /api/posts/:postid/reviews */
module.exports.reviewsCreate = function(req, res) {
  if (req.params.post) {
    Loc
      .findById(req.params.post)
      .select('reviews')
      .exec(
        function(err, post) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            doAddReview(req, res, post);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, postid required"
    });
  }
};


var doAddReview = function(req, res, post) {
  if (!post) {
    sendJSONresponse(res, 404, "postid not found");
  } else {
    post.reviews.push({
      author: req.body.author,
      reviewText: req.body.reviewText
    });
    post.save(function(err, post) {
      var thisReview;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        thisReview = location.reviews[post.reviews.length - 1];
        sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};


module.exports.reviewsUpdateOne = function(req, res) {
  if (!req.params.postid || !req.params.reviewid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, postid and reviewid are both required"
    });
    return;
  }
  Loc
    .findById(req.params.postid)
    .select('reviews')
    .exec(
      function(err, post) {
        var thisReview;
        if (!post) {
          sendJSONresponse(res, 404, {
            "message": "postid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (post.reviews && post.reviews.length > 0) {
          thisReview = post.reviews.id(req.params.reviewid);
          if (!thisReview) {
            sendJSONresponse(res, 404, {
              "message": "reviewid not found"
            });
          } else {
            thisReview.author = req.body.author;
            thisReview.reviewText = req.body.reviewText;
            post.save(function(err, post) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 200, thisReview);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No review to update"
          });
        }
      }
  );
};

module.exports.reviewsReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.postid && req.params.reviewid) {
    Loc
      .findById(req.params.postid)
      .select('name reviews')
      .exec(
        function(err, post) {
          console.log(post);
          var response, review;
          if (!post) {
            sendJSONresponse(res, 404, {
              "message": "postid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (post.reviews && post.reviews.length > 0) {
            review = post.reviews.id(req.params.reviewid);
            if (!review) {
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {
                post: {
                  name: post.name,
                  id: req.params.postid
                },
                review: review
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, postid and reviewid are both required"
    });
  }
};

// app.delete('/api/posts/:postid/reviews/:reviewid'
module.exports.reviewsDeleteOne = function(req, res) {
  if (!req.params.postid || !req.params.reviewid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, postid and reviewid are both required"
    });
    return;
  }
  Loc
    .findById(req.params.postid)
    .select('reviews')
    .exec(
      function(err, post) {
        if (!post) {
          sendJSONresponse(res, 404, {
            "message": "postid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (post.reviews && post.reviews.length > 0) {
          if (!post.reviews.id(req.params.reviewid)) {
            sendJSONresponse(res, 404, {
              "message": "reviewid not found"
            });
          } else {
            post.reviews.id(req.params.reviewid).remove();
            post.save(function(err) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                updateAverageRating(post._id);
                sendJSONresponse(res, 204, null);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No review to delete"
          });
        }
      }
  );
};
