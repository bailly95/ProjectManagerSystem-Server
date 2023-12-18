import { post } from "../config/mail.config";

assignUser = async (req, res, message) => {
  try {
    const request = post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "bailly.g@hotmail.fr",
            Name: "ProjectManagerSystem",
          },
          To: [
            {
              Email: message.email,
              Name: message.firstname + " " + message.lastname,
            },
          ],
          TemplateID: 5308707,
          TemplateLanguage: true,
          Variables: {
            firstname: message.firstname,
            lastname: message.lastname,
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

export default assignUser;
