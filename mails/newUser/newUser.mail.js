const fs = require("fs");
const hogan = require("hogan.js");
const emailTransporter = require("../../config/mail.config");

newUser = async (req, res, message) => {
  try {
    // Load the template file
    const templateFile = fs.readFileSync("./app/mails/newUser/newUser.html");
    
    // Inject the data in the template and compile the HTML
    const data = {
      APP_NAME: process.env.APP_NAME,
      firstname: message.firstname,
      lastname: message.lastname,
    };
    
    const templateCompiled = hogan.compile(templateFile.toString());
    const templateRendered = templateCompiled.render(data);
    
    const emailData = {
      to: message.email,
      from: process.env.EMAIL_USER,
      subject: "Nouvelle inscription à " + process.env.APP_NAME,
      html: templateRendered,
    };
    
    // Send the email
    await emailTransporter.sendMail(emailData);
    res.send({ message: "User was registered successfully!" });
  } catch (e) {
    console.error(e);
  }
};

module.exports = newUser;