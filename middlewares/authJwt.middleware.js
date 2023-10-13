const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Project = db.project;

// verify for session
verifyToken = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "No token provided" });
  }
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

isProjectOwner = async (req, res, next) => {
  const creatorIdParams = parseInt(req.params.creatorId);
  const creatorIdBody = parseInt(req.body.creatorId);
  const projectId = req.params.projectId;
  const creatorId = creatorIdParams || creatorIdBody;
  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    if (project.createdBy !== creatorId) {
      return res.status(403).json({
        message: "Vous n'avez pas l'autorisation pour assigner à ce projet",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking project owner:", error);
    return res.status(500).json({ message: "Erreur du serveur" });
  }
};

const authJwtMiddleware = {
  verifyToken,
  isAdmin,
  isProjectOwner,
};
module.exports = authJwtMiddleware;
