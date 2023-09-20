const nodeMailer = require('../config/nodemailer');
const crypto = require('crypto');
const pass = crypto.randomBytes(5).toString('hex');
exports.changePass = function(user){
    nodeMailer.transporter.sendMail({
        from:"sukunar613@gmail.com",
        to: user.email,
        subject: "Forgot password",
        html: `your code is ${pass}`
    }, function(err, info){
        if(err){
            console.log("Error in sending mail", err);
            return;
        }
        console.log("Mail sent", info);
        return;
    })
}