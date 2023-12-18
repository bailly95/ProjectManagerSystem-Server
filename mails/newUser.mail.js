const mailjet = require("../config/mail.config");

newUser = async (req, res, message) => {
  try {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "projectmanagersystem@outlook.fr",
            Name: "ProjectManagerSystem",
          },
          To: [
            {
              Email: message.email,
              Name: message.firstname + " " + message.lastname,
            },
          ],
          TemplateID: 5311167,
          TemplateLanguage: true,
          Variables: {
            firstname: message.firstname,
            lastname: message.lastname,
            email: message.email,
            password: message.password,
          },
        },
      ],
    });
    request
      .then((result) => {
        console.log(result.body);
        res
          .status(201)
          .json({ message: "Utilisateur enregistré avec succès!" });
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  } catch (e) {
    console.error(e);
  }
};

module.exports = newUser;
