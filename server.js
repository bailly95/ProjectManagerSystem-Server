const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./models");
const Role = db.role;

const auth = require("./routes/auth.routes");
const user = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:4200"],
  })
);

// force sync destroy everything
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 2,
//     name: "admin"
//   });
// }

//sync for prod
db.sequelize.sync();


const setCommonHeaders = (req, res, next) => {
  res.set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
};

//Routes
app.use("/auth", auth, setCommonHeaders);
app.use("/api/user", user, setCommonHeaders);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Connected to port " + port);
});


