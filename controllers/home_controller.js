const Post = require('../models/post');
module.exports.home = async function(req, res){
    try {
        const post = await Post.find({})
        .sort('-createdAt')
        .populate('user', '-password')
        .populate(
            {
                path:'comments',
                options: {sort: {createdAt: 1}},
                populate:{
                    path:'user',
                    select: '-password'
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