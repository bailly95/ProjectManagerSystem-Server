const fs = require("fs");
const hogan = require("hogan.js");
const emailTransporter = require("../../config/mail.config");

resetPassword = async (req, res, message) => {
  try {
    // Load the template file
    const templateFile = fs.readFileSync("./app/mails/resetPassword/resetPassword.html");
    
    // Inject the data in the template and compile the HTML
    const data = {
      CLIENT_URL: process.env.CLIENT_URL,
      token: message.token,
    };
    
    const templateCompiled = hogan.compile(templateFile.toString());
    const templateRendered = templateCompiled.render(data);
    
    const emailData = {
      to: message.email,
      from: process.env.EMAIL_USER,
      subject: "Demande de nouveau mot de passe à " + process.env.APP_NAME,
      html: templateRendered,
    };
    
    // Send the email
    await emailTransporter.sendMail(emailData);
    
    return res.status(200).json({
      message: "Email has been sent, please follow the instructions",
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = resetPassword;
