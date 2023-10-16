const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize);
db.role = require("../models/role.model.js")(sequelize);
db.comment = require("../models/comment.model.js")(sequelize);
db.project = require("../models/project.model.js")(sequelize);
db.task = require("../models/task.model.js")(sequelize);
db.notification = require("../models/notification.model.js")(sequelize);

//Many to Many
//role => user
db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});
//user => project
db.user.belongsToMany(db.project, {
  through: "user_projects",
});
db.project.belongsToMany(db.user, {
  through: "user_projects",
});
//user => task
db.user.belongsToMany(db.task, {
  through: "user_tasks",
});
db.task.belongsToMany(db.user, {
  through: "user_tasks",
});

//One to Many
//user => project
db.project.belongsTo(db.user, {
  foreignKey: "createdBy",
});
//project => task
db.task.belongsTo(db.project, {
  foreignKey: "projectId",
});
//task => comment
db.task.hasMany(db.comment, { foreignKey: "taskId" });
db.comment.belongsTo(db.task, {
  foreignKey: "taskId",
});
//user => comment
db.comment.belongsTo(db.user, {
  foreignKey: "userId",
});
//user => notification
db.notification.belongsTo(db.user, {
  foreignKey: "userId",
})
//project => notification
db.notification.belongsTo(db.project, {
  foreignKey: "projectId",
})

db.ROLES = ["user", "admin"];

module.exports = db;