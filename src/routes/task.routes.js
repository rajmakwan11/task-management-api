const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const taskController = require("../controllers/task.controller")

const taskRouter = express.Router()

//Creating new Task

taskRouter.post("/", authMiddleware, taskController.createTaskController)

// get All task with pagination

taskRouter.get("/", authMiddleware, taskController.getAllTasksController)

// get specific task with ID

taskRouter.get("/:id", authMiddleware, taskController.getTaskByIdController)

// updating the description or status of task with id

taskRouter.put("/:id", authMiddleware, taskController.updateTaskController)

// Delete the task with id

taskRouter.delete("/:id", authMiddleware, taskController.deleteTaskController)

module.exports = taskRouter