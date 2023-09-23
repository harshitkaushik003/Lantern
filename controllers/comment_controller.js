const Comments = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comment_mailer');
module.exports.create = async function(req, res){
    const post = await Post.findById(req.body.post);
    if (post) {
        const comment = await Comments.create({
          content: req.body.content,
          user: req.user._id,
          post: req.body.post,
        });
    
        post.comments.push(comment);
        await post.save();
    
        // Populate the user field in the comment object with 'name' and 'email'
        await comment.populate('user', 'name email');
    
        // Send a comment notification email
        commentsMailer.newComment(comment);
        if(req.xhr){
          return res.json(200, {
            data: {
              comment: comment,
              user: comment.user.name,
            },
            message: "Comment added"
          })
        }
    
        res.redirect('/');
      } else {
        console.error('Post not found');
        res.redirect('/');
      }
}

module.exports.destroy = async function(req, res){
    const comment = await Comments.findById(req.params.id);
    if(comment.user == req.user.id){
        let postId = comment.post;
        comment.deleteOne();
        await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
        // .then(function(){
        //     return res.redirect('back');
        // })
        if(req.xhr){
          return res.status(200).json(
            {
              data: {
                comment_id: req.params.id
              },
              message: "Comment Deleted successfully"
            }
          )
        }
        return res.redirect('back');
    }else{
        return res.redirect('back');
    }
}