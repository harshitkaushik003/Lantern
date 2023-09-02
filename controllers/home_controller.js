const Post = require('../models/post');
module.exports.home = async function(req, res){
    try {
        const post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate(
            {
                path:'comments',
                populate:{
                    path:'user'
                }
            }
        );
        return res.render('home', {
            title: "HomePage",
            text: "Lantern",
            posts:post,
            excludeNavbar: false
        });      
    } catch (error) {
        console.log("error in renderign home\n", error);
        return;
    }


}