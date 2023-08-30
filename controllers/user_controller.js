module.exports.profile = function(req, res){
    return res.render('user', {
        title:"userPage"
    })
}

module.exports.signIn = function(req, res){
    return res.render('sign-in', {
        title:"sign in"
    })
}
module.exports.signUp = function(req, res){
    return res.render('sign-up', {
        title:"sign up"
    })
}

