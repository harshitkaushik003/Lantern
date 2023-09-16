const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.post = function(req, res){
    if(req.isAuthenticated()){
        return res.render('create-post', {
            title: 'Create Page',
            excludeNavbar: false
        })
    }else{
        res.redirect('back');
    }   
}

module.exports.create = async function(req, res){
    try {
        const response = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: response
                },
                message: "Post Created"
            })
        }
        return res.redirect('/');
    } catch (error) {
        console.log(`Error while creating a post \n ${error}`);   
    }
}

module.exports.destroy = async function(req,res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.deleteOne();
            Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }      
    } catch (error) {
        console.log(`error in creating post\n${error}`);
        return res.redirect('back');
    }

}