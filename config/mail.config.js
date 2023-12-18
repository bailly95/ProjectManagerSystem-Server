const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

module.exports = mailjet;
