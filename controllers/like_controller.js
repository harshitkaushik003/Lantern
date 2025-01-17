const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try{
        //likes/toggle/?id=abcde&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if a like already exist
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        
        //like already exist
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.deleteOne();
            deleted =  true;
        }else{
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
        if(req.xhr){
            return res.status(200).json({
                data:{
                    deleted:deleted,
                    post_id: req.query.id
                },
                message: "Request Successful",
            })
        }
        return res.redirect("back");

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}