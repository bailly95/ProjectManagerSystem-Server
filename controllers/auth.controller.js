const db = require("../models");
const User = db.user;
const Role = db.role;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password, roles } = req.body;
  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    let userRoles = [1];
    if (roles) {
      const foundRoles = await Role.findAll({
        where: {
          name: {
            [Op.or]: roles,
          },
        },
      });
      userRoles = foundRoles.map(role => role.id);
    }

    const result = await user.setRoles(userRoles);
    if (result) {
      res.status(201).send({ message: "User registered successfully!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    const token = jwt.sign({ email: user.email, id: user.id }, process.env.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "7d", // 7 days
    });
    res.status(200).json({ id: user.id, token });
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed" + err,
    });
  }
};


