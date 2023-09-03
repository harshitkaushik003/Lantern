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

module.exports.destroy = async function(req, res){
    const comment = await Comments.findById(req.params.id);
    if(comment.user == req.user.id){
        let postId = comment.post;
        comment.deleteOne();
        Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
        .then(function(){
            return res.redirect('back');
        })
    }else{
        return res.redirect('back');
    }
}