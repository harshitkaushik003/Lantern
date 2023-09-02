const Comments = require('../models/comment');
const Post = require('../models/post');
module.exports.create = async function(req, res){
    const post = await Post.findById(req.body.post);
    if(post){
        Comments.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post
        }).then(function(comment){
            post.comments.push(comment);
            post.save();
            res.redirect('/');           
        })
    }
}