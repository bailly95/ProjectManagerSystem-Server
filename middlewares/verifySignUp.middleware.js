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
      message: "Erreur ! L'email est déja utilisé !",
    });
    return;
  }
  next();
};

checkRolesExisted = (req, res, next) => {
  const { roles } = req.body;
  if (roles && roles.some((role) => !ROLES.includes(role))) {
    return res.status(400).json({
      message: `Failed! Role does not exist = ${roles.find(
        (role) => !ROLES.includes(role)
      )}`,
    });
  }
  next();
};

checkServicesExisted = async (req, res, next) => {
    const { service } = req.body;
    const services = await Services.findAll()
  if (service && service.some((service) => !services.includes(service))) {
    return res.status(400).json({
      message: `Failed! Service does not exist = ${services.find(
        (service) => !services.includes(service)
      )}`,
    });
  }
  next();
}
const verifySignUpMiddleware = {
  checkDuplicateEmail,
  checkRolesExisted,
  checkServicesExisted,
};

module.exports = verifySignUpMiddleware;
