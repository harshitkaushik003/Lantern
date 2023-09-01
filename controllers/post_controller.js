const Post = require('../models/post');
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