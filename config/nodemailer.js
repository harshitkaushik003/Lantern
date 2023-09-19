const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'sukunar613@gmail.com',
//         pass: 'H12345abcd',
//     }
// });

// let renderTemplate = (data, relativePath)=>{
//     let mailHTML;
//     ejs.renderFile(
//         path.join(__dirname, '../views/mailers', relativePath),
//         data,
//         function(err, template){
//             if(err){
//                 console.log("Error in rendering template", err);
//                 return;
//             }
//             mailHTML = template;
//         }
//     )

//     return mailHTML;

// }

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'sukunar613@gmail.com',
        pass: 'phft krom ucpg ezvx',
    }
});

const renderTemplate = async (data, relativePath) => {
    try {
        const mailHTML = await ejs.renderFile(
            path.join(__dirname, '../views/mailers', relativePath),
            data
        );
        return mailHTML;
    } catch (err) {
        console.log("Error in rendering template", err);
        throw err; // Propagate the error
    }
};

module.exports = {
    transporter,
    renderTemplate
};
