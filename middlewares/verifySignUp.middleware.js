const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    res.status(400).json({
      message: "Erreur : Email est déja utilisé !",
    });
    return;
  }
  next();
};

checkRolesExisted = (req, res, next) => {
  const { roles } = req.body;
  if (roles && roles.some((role) => !ROLES.includes(role))) {
    return res.status(400).json({
      message: `Erreur : Le rôle n'existe pas = ${roles.find(
        (role) => !ROLES.includes(role)
      )}`,
    });
  }
  next();
};


const verifySignUpMiddleware = {
  checkDuplicateEmail,
  checkRolesExisted,
};

module.exports = verifySignUpMiddleware;
