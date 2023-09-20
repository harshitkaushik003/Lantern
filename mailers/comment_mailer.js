const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlString  = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    console.log("inside new comment mailer");
    nodeMailer.transporter.sendMail({
        from: "sukunar613@gmail.com",
        to: comment.user.email,
        subject:"New Comment added",
        html:htmlString
    }, (err, info)=>{
        if(err){
            console.log("Error in sending mail", err);
            return;   
        }
        console.log("Mail sent", info);
        return;
    })
}
