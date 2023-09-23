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
    // let redirectToRoot = false;
    try {
        const response = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        // if(req.xhr){
        //     req.flash('success', 'Post Created Successfully');
        //     redirectToRoot = true;
        //     return res.status(200).json({
        //         data: {
        //             post: response
        //         },
        //         message: "Post Created Successfully"
        //     })
        // }
        // if(redirectToRoot){
        //     return res.redirect('/');
        // }
        req.flash('success', 'Post Created Successfully');
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
            if(req.xhr){
                // console.log("reached at this point");
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                })
            }
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }      
    } catch (error) {
        console.log(`error in deleting a post\n${error}`);
        return res.redirect('back');
    }

}