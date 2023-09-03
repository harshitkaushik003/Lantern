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

module.exports.create =  function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then(function(){
        return res.redirect('/');
    })
    .catch(function(err){
        console.log(`Error while creating a post \n ${err}`);
    })
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