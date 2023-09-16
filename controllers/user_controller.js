const User = require('../models/user');
const Post = require('../models/post');
module.exports.profile = async function(req, res){
    const post = await Post.find({user: req.user.id}).populate('user').populate('comments');
    if(post){
        console.log(post);
        return res.render('user', {
            title:"userPage",
            excludeNavbar: false,
            posts: post
        })       
    }

}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profiles');
    }
    return res.render('sign-in', {
        title:"sign in",
        excludeNavbar: 'true'
    })
}
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profiles');
    }
    return res.render('sign-up', {
        title:"sign up",
        excludeNavbar: 'true'
    })
}

module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords donot match');
        return res.redirect('back');
    }
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            User.create(req.body);
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('/user/sign-in');
        }
    }catch(err){
        console.log("error while creating the user");
        return res.redirect('back');
    }
}

module.exports.createSession = function(req, res){
    req.flash('success', 'logged in successfully')
    return res.redirect('/');
}

module.exports.signOut = function(req, res){
    
    req.logout(function(err){
        if(err){
            console.log(`Error ${err} while logging out`);
            return;
        }

        req.flash('success', 'logged out successfully');

        setTimeout(function() {
            return res.redirect('/');
        }, 100);
    });    
}