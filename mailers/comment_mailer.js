const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log("inside new comment mailer");
    nodeMailer.transporter.sendMail({
        from: "sukunar613@gmail.com",
        to: comment.user.email,
        subject:"New Comment added",
        html:"<h1>Your Comment is now published</h1>"
    }, (err, info)=>{
        if(err){
            console.log("Error in sending mail", err);
            return;   
        }
        console.log("Mail sent", info);
        return;
    })
}
