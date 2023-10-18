const db = require("../models");
const Comment = db.comment;
const Task = db.task;
const User = db.user;

exports.createComment = async (req, res) => {
  try {
    const { description, taskId, userId } = req.body;
    const comment = await Comment.create({
      description: description,
      taskId: taskId,
      userId: userId,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error while Comment created: ", err });
  }
};

exports.getAllCommentsByTaskId = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const comments = await Comment.findAll({
      where: {
        taskId: taskId,
      },
      include: [User],
    });
    console.log(comments);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error while getting Comments: ", err });
  }
};
