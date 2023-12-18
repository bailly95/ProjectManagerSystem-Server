const db = require("../models");
const Task = db.task;
const Project = db.project;

exports.createTask = async (req, res) => {
  try {
    const { name, description, duration, projectId } = req.body;
    await Task.create({
      name: name,
      description: description,
      duration: duration,
      projectId: projectId,
    });
    res.status(201).json({ message: "Task created successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while adding Task to Project: ", err });
  }
};

exports.updateTask = async (req, res) => {
  try {
    console.log(req.body.status)
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    await task.update({ name: req.body.name, description: req.body.description, duration: req.body.duration ,status:req.body.status });
    return res.status(200).json({ message: "Task updated successfully." });
  } catch (err) {
    return res.status(408).json({ error: err });
  }
  
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        message: `Task with id=${taskId} not found`,
      });
    }

    await task.destroy();

    res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting task with id=" + taskId,
    });
  }
};
exports.updateStatusTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const status = req.params.status;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    task.status = parseInt(status);
    await task.save();
    return res.status(200).json({ message: "Task status updated successfully." });
  } catch (err) {
    return res.status(408).json({ error: err });
  }
};

  exports.getTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found." });
      }
      return res.status(200).json(task);
    } catch (err) {
      return res.status(408).json({ error: err });
    }
  }

  exports.assignTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.params.userId;
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found." });
      }
      task.userId = userId;
      await task.save();
      return res.status(200).json({ message: "Task assigned successfully." });
    } catch (err) {
      return res.status(408).json({ error: err });
    }
  }
