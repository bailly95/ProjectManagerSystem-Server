const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const db = require("./models");
const User = db.user;
const Role = db.role;
const Department = db.department;

const admin = require("./routes/admin.routes")
const auth = require("./routes/auth.routes");
const user = require("./routes/user.routes");
const task = require("./routes/task.routes");
const project = require("./routes/project.routes");
const comment = require("./routes/comment.routes");
const department = require("./routes/department.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["https://mystifying-archimedes.51-68-229-144.plesk.page/"],
  })
);

// force sync destroy everything
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// async function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });
//   Role.create({
//     id: 2,
//     name: "admin",
//   });
//   Role.create({
//     id: 3,
//     name: "rh",
//   });
//   Department.create({
//     id: 1,
//     name: "Administrateur",
//   });
//   Department.create({
//     id: 2,
//     name: "Dirigeant",
//   });
//   Department.create({
//     id: 3,
//     name: "Développeur",
//   });
//   Department.create({
//     id: 4,
//     name: "Comptabilité",
//   });
//   Department.create({
//     id: 5,
//     name: "Ressources Humaines",
//   });

//   await User.create({
//     id: 1,
//     firstname: "admin",
//     lastname: "admin",
//     email: "admin@admin.fr",
//     password: bcrypt.hashSync("admin06", 8),
//     departmentId: 1,
//   });
//   const admin = await User.findOne({
//     where: {
//       id: 1, // Replace with the actual user ID
//     },
//   });
//   console.log("admin", admin);
//   await admin.setRoles([2]); 
// }

//sync for prod
db.sequelize.sync();

const setCommonHeaders = (req, res, next) => {
  res.set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
};

//Routes
app.use("/admin",admin,setCommonHeaders);
app.use("/auth", auth, setCommonHeaders);
app.use("/api/user", user, setCommonHeaders);
app.use("/api/task", task, setCommonHeaders);
app.use("/api/project", project, setCommonHeaders);
app.use("/api/comment", comment, setCommonHeaders);
app.use("/api/department", department, setCommonHeaders);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Connected to port " + port);
});


