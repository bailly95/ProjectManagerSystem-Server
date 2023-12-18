const db = require("../models");
const Project = db.project;
const User = db.user;
const Task = db.task;
const Comment = db.comment;
const Notification = db.notification;
const Mail = require("../mails");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll(
      {
        include: [
          {
            model: User,
          },
        ],
      }
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const project = await Project.create({
      name: name,
      createdBy: userId,
    });
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User Not found." });
    } else {
      await user.addProject(project);
      res
        .status(201)
        .json({ message: "Project created successfully.", project });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while adding Project to User: ", err });
  }
};

exports.getProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await Task.findAll({
      where: {
        projectId: projectId,
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
          },
        },
      ],
    });
    const project = await Project.findByPk(projectId);
    res.status(200).json({ tasks, project });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" + error });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findByPk(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found." });
    } else {
      await project.destroy();
      res.status(200).json({ message: "Project deleted successfully." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error while deleting Project: ", err });
  }
};

exports.getAllUsersOfProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findByPk(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found." });
    }
    const users = await project.users.findAll();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while getting Users of Project: ", err });
  }
};

exports.getUsersByProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findByPk(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found." });
    }
    const users = await project.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while getting Users of Project: ", err });
  }
};

exports.assignProject = async (req, res) => {
  try {
    const projectId = parseInt(req.body.projectId);
    const creatorId = parseInt(req.body.creatorId);
    const users = req.body.users;
    const project = await Project.findByPk(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found." });
    }
    // Supprimer les utilisateurs du projet s'ils ne sont plus sélectionnés
    const currentUsers = await project.getUsers();
    const usersToRemove = currentUsers.filter((user) => {
      return user.id !== creatorId && !users.includes(user);
    });
    await project.removeUsers(usersToRemove);
    // Ajouter les nouveaux utilisateurs au projet
    users.forEach(async (user) => {
      const isInProject = await User.findOne({
        where: {
          id: user.id,
        },
        include: {
          model: Project,
          where: {
            id: projectId,
          },
        },
      });
      if (!isInProject) {
        await project.addUser(user.id);
      }
    });
    res.status(201).json({ message: "Project assigned successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" + error });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { name,createdBy } = req.body;
    const project = await Project.findByPk(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found." });
    } else {
      project.name = name;
      project.createdBy = createdBy;
      await project.save();
      res.status(200).json({ message: "Project updated successfully." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while updating Project: ", err });
  }
}
