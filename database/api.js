/* The API controller
*/


var Message = require('./model');

exports.post = function(req, res) {
    new Message({room_id: req.body.room_id, message_id: req.body.message_id, message: req.body.message, sender: req.body.sender}).save();
}

exports.list = function(req, res) {
    Message.find(function(err, list) {
    res.send(list);
  });
}

// first locates a thread by title, then locates the replies by thread ID.
exports.show = (function(req, res) {
    Thread.findOne({title: req.params.title}, function(error, thread) {
        var posts = Post.find({thread: thread._id}, function(error, posts) {
          res.send([{thread: thread, posts: posts}]);
        });
    })
});