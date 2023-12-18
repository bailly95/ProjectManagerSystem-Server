const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Project = db.project;

// verify for session
verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "No token provided" });
  }
};

isAdmin = async (req, res, next) => {
  try {
    const userParams = req.params.userId
    const userBody = req.body.userId
    const userId = userBody || userParams
    const user = await User.findByPk(userId);
    
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).json({
      message: "Rôle d'administrateur requis!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Impossible de valider le rôle d'utilisateur!",
    });
  }
};

isAdminOrRh = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.userId);
    const roles = await user.getRoles();
    console.log(roles)
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin" || roles[i].name === "rh") {
        return next();
      }
    }

    return res.status(403).json({
      message: "Rôle d'administrateur ou RH requis!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Impossible de valider le rôle d'utilisateur!",
    });
  }
};

isProjectOwner = async (req, res, next) => {
  const creatorId = req.body.creatorId;
  const projectId = req.params.projectId;
  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    if (project.createdBy !== creatorId) {
      return res.status(403).json({
        message: "Vous n'avez pas l'autorisation pour assigner des perssonnes à ce projet",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Erreur du serveur : ",error:error });
  }
};

const authJwtMiddleware = {
  verifyToken,
  isAdmin,
  isProjectOwner,
  isAdminOrRh
};
module.exports = authJwtMiddleware;
