var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var buildPostList = function(req, res) {
  var posts = [];
  results.forEach(function(doc) {
    posts.push({
      name: doc.obj.name,
      _id: doc.obj._id
    });
  });
  return posts;
};

/* Obtenemos lista de Posts */
module.exports.postsList = function(req, res) {
    Loc.find(){
      var posts = buildPostList(req, res);
      sendJSONresponse(res, 200, posts);
    }
};


/* GET a single post by the id */
module.exports.postsReadOne = function(req, res) {
  console.log('Buscando post', req.params);
  if (req.params && req.params.postid) {
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            "message": "postid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(location);
        sendJSONresponse(res, 200, location);
      });
  } else {
    console.log('No postid specified');
    sendJSONresponse(res, 404, {
      "message": "No postid in request"
    });
  }
};

/* POST a new post */
/* /api/posts */
module.exports.postsCreate = function(req, res) {
  console.log(req.body);
  Loc.create({
    name: req.body.name
  }, function(err, post) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(post);
      sendJSONresponse(res, 201, post);
    }
  });
};

/* PUT /api/posts/:postid */
module.exports.postsUpdateOne = function(req, res) {
  if (!req.params.postid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, postid is required"
    });
    return;
  }
  Loc
    .findById(req.params.postid)
    .select('-reviews')
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
        post.name = req.body.name;
        post.save(function(err, post) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, post);
          }
        });
      }
  );
};

/* DELETE /api/posts/:postid */
module.exports.postsDeleteOne = function(req, res) {
  var postid = req.params.postid;
  if (postid) {
    Loc
      .findByIdAndRemove(postid)
      .exec(
        function(err, post) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Post id " + postid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No postid"
    });
  }
};