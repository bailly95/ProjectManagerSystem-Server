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
db.department = require("./department.model.js")(sequelize);
db.comment = require("../models/comment.model.js")(sequelize);
db.project = require("../models/project.model.js")(sequelize);
db.task = require("../models/task.model.js")(sequelize);
db.notification = require("../models/notification.model.js")(sequelize);

//Many to Many
//role => user
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
// });
// //service => user
// db.department.belongsToMany(db.user, {
//   through: "user_departments",
// });
// db.user.belongsToMany(db.department, {
//   through: "user_departments",
// });
//user => project
// db.user.belongsToMany(db.project, {
//   through: "user_projects",
// });
// db.project.belongsToMany(db.user, {
//   through: "user_projects",
// });
// //user => task
// db.user.belongsToMany(db.task, {
//   through: "user_tasks",
// });
// db.task.belongsToMany(db.user, {
//   through: "user_tasks",
// });

//One to Many
//user => department
// db.user.belongsTo(db.department, {
//   foreignKey: "departmentId",
// });
// //user => project
// db.project.belongsTo(db.user, {
//   foreignKey: "createdBy",
// });
// //project => task
// db.task.belongsTo(db.project, {
//   foreignKey: "projectId",
// });
// //task => comment
// db.task.hasMany(db.comment, { foreignKey: "taskId" });
// db.comment.belongsTo(db.task, {
//   foreignKey: "taskId",
// });
// //user => comment
// db.comment.belongsTo(db.user, {
//   foreignKey: "userId",
// });
// //user => notification
// db.notification.belongsTo(db.user, {
//   foreignKey: "userId",
// })
// //project => notification
// db.notification.belongsTo(db.project, {
//   foreignKey: "projectId",
// })

// Many-to-many
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.project, {
  through: "user_projects",
  foreignKey: "userId",
  otherKey: "projectId",
});

db.project.belongsToMany(db.user, {
  through: "user_projects",
  foreignKey: "projectId",
  otherKey: "userId",
});

db.user.belongsToMany(db.task, {
  through: "user_tasks",
  foreignKey: "userId",
  otherKey: "taskId",
});

db.task.belongsToMany(db.user, {
  through: "user_tasks",
  foreignKey: "taskId",
  otherKey: "userId",
});

// One-to-many

db.user.belongsTo(db.department, { foreignKey: "departmentId" });
db.department.hasMany(db.user, { foreignKey: "departmentId" });

db.user.hasMany(db.project, { foreignKey: "createdBy" });
db.project.belongsTo(db.user, { foreignKey: "createdBy" });

db.project.hasMany(db.task, { foreignKey: "projectId" });
db.task.belongsTo(db.project, { foreignKey: "projectId" });

db.task.hasMany(db.comment, { foreignKey: "taskId" });
db.comment.belongsTo(db.task, { foreignKey: "taskId" });

db.user.hasMany(db.comment, { foreignKey: "userId" });
db.comment.belongsTo(db.user, { foreignKey: "userId" });

db.user.hasMany(db.notification, { foreignKey: "userId" });
db.notification.belongsTo(db.user, { foreignKey: "userId" });

db.project.hasMany(db.notification, { foreignKey: "projectId" });
db.notification.belongsTo(db.project, { foreignKey: "projectId" });

db.ROLES = ["user", "admin"];

module.exports = db;