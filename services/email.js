var nodemailer = require("nodemailer");
async function sendMail(to, subject, text) {
  var transport = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.WEBSITE_MAIL,
      pass: process.env.WEBSITE_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.WEBSITE_MAIL,
    to: to,
    subject: subject,
    text: text,
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = { sendMail };
