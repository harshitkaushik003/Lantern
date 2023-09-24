const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');
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
                },
                populate: {
                    path: 'likes'
                }
            }
        ).populate('likes');
        const users = await User.find({});

        return res.render('home', {
            title: "HomePage",
            text: "Lantern",
            posts:post,
            all_users: users,
            excludeNavbar: false
        });    
    } catch (error) {
        console.log("error in renderign home\n", error);
        return;
    }


}