const fs = require("fs");
const hogan = require("hogan.js");
const emailTransporter = require("../../config/mail.config");

assign = async (req, res, message) => {
  console.log("assign")
  try {
    // Load the template file
    const templateFile = fs.readFileSync("./app/mails/assign/assign.html");
    
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
      subject: "Demande pour rejoindre un projet sur " + process.env.APP_NAME,
      html: templateRendered,
    };
    
    // send the email
    await emailTransporter.sendMail(emailData);
    res.json({ message: "User was assigned successfully!" });
  } catch (e) {
    console.error(e);
  }
};

module.exports = assign;