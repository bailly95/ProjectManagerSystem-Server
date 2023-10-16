const db = require("../models");
const User = db.user;
const Project = db.project;

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id,{
  attributes: ["id", "email","firstname","lastname"],
});
    
    res.status(200).json({
      user: user,
      message: "Data successfully retrieved.",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addProject = async (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;

  try {
    const [user, project] = await Promise.all([
      User.findByPk(userId),
      Project.findByPk(projectId),
    ]);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (!project) {
      return res.status(404).send({ message: "Project not found." });
    }

    await user.addProject(project);

    return res.status(201).send({
      message: `Added Project id=${project.id} to User id=${user.id}`,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error while adding Project to User.", error: err });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { password, newPassword } = req.body;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    user.password = bcrypt.hashSync(newPassword, 8);
    await user.save();
    res.status(200).send({ message: "Password updated successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error while updating password.", error: err });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  const password = req.body.password;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    await user.destroy();
    res.status(200).send({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error while deleting User.", error: err });
  }
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const token = jwt.sign({ id: user.id }, process.env.RESET_PASSWORD_KEY, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "15m", // 15minutes
    });
    user.resetLink = token;
    await user.save();

    const message = {
      token: token,
      email: user.email,
    };
    await Mail.resetPassword(req, res, message);
  } catch (err) {
    return res.status(408).json({ error: "reset password link error" });
  }
};

exports.updatePassword = async (req, res) => {
  const { password, token } = req.body;

  if (token) {
    jwt.verify(token, process.env.RESET_PASSWORD_KEY, (err, decoded) => {
      if (err)
        return res.status(400).send({ message: "Incorect token or expired!" });
    });
  }
  try {
    const user = await User.findOne({
      where: {
        resetLink: token,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    user.password = bcrypt.hashSync(password, 8);
    await user.save();
    return res.status(200).send({ message: "Password updated successfully." });
  } catch (err) {
    return res.status(408).json({ error: err });
  }
};

exports.getProjectByUserId = async (req, res) => {
  console.log(req.params.userId+"coucou");
  try {
    const userId = req.params.userId;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [Project],
    });
    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" + error });
  }
};