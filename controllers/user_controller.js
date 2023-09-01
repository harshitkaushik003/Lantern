const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user', {
        title:"userPage",
        excludeNavbar: false
    })
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
        return res.redirect('back');
    }
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            User.create(req.body);
            return req.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("error while creating the user");
        return res.redirect('back');
    }
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.signOut = function(req, res){
    req.logout(function(err){
        if(err){
            console.log(`Error ${err} while logging out`);
            return;
        }
    });
    return res.redirect('/');
}