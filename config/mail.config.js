const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // Email user
    pass: process.env.EMAIL_PASSWORD, // Email password
  },
});

module.exports = emailTransporter;
