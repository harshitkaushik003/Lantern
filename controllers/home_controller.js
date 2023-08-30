module.exports.home = function(req, res){
    return res.render('home', {
        title: "HomePage",
        text: "Lantern"
    });
}