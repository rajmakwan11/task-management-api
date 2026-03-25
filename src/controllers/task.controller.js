const taskModel = require("../models/task.model")

// Creating Task Controller

async function createTaskController(req,res){

    try{
    const {title, description, status} = req.body || {};

    if(!title){
        return res.status(400).json({
            status:"fail",
            data:{},
            message:"Title is Required"
        })
    }

    const task = await taskModel.create({
        title,
        description,
        status,
        userId: req.user.id
    }) 

    res.status(201).json({
        status:"success",
        data:{
            task:task
        }
    })

    }

    catch(err){
        res.status(500).json({
            status:"fail",
            data:{},
            message:err.message
        })
    }
    
}

//get All tasks with pagination
//giving 10 task limit for now

async function getAllTasksController(req,res){
    try{
        const page = Number(req.query.page) || 1;
        const limit = 10;

        // console.log(page)

        const tasks = await taskModel.find({ userId: req.user.id})
        .skip((page-1)*limit)
        .limit(limit)

        res.status(200).json({
            status:"success",
            data: {tasks},
            message:"Tasks Fetched Successfully"
        })
    }
    catch(err){
        res.status(500).json({
            status:"fail",
            data:{},
            message:err.message
        })
    }
}

// Get Task By Id

async function getTaskByIdController(req,res){

    try{
        const {id} = req.params || {};

    if(!id){
        return res.status(400).json({
            status:"fail",
            data:{},
            message:"Id is Required"
        })
    }

    const task = await taskModel.findById(id)

    if(!task){
        return res.status(401).json({
            status:"fail",
            data:{},
            message:"Task Not Found"
        })
    }

    res.status(200).json({
        status:"success",
        data:{
            task:task
        },
        message:"Task Fetched Successfully"
    })

    }
    catch(err){
        res.status(500).json({
            status:"fail",
            data:{},
            message:err.message
        })
    }
    
}

// updating the description or status of task with id

async function updateTaskController(req, res) {
    try {
        const { id } = req.params;
        const { status, description } = req.body;

        //Find task
        const task = await taskModel.findById(id);

        //Check if exists
        if (!task) {
            return res.status(404).json({
                status: "fail",
                data: {},
                message: "Task not found"
            });
        }

        //Ownership check
        if (task.userId.toString() !== req.user.id) {
            return res.status(404).json({
                status: "fail",
                data: {},
                message: "Task not found"
            });
        }

        //Update only provided fields
        if (status) task.status = status;
        if (description) task.description = description;

        //Save updated task
        await task.save();

        //Response
        res.status(200).json({
            status: "success",
            data: { task },
            message: "Task updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            status: "fail",
            data: {},
            message: err.message
        });
    }
}

// delete the task based on ID

async function deleteTaskController(req,res){
    
    try{
        const {id} = req.params || {};
    
    if(!id){
        return res.status(404).json({
            status:"fail",
            data:{},
            message:"Task Not Found"
        })
    }

    const deletedTask = await taskModel.findByIdAndDelete(id)

    if(!deletedTask){
        return res.status(404).json({
            status:"fail",
            data:{},
            message:"Task could not deleted"
        })
    }

    res.status(200).json({
        status:"success",
        data:{},
        message:"task deleted successfully"
    })
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
            data: {},
            message: err.message
        });
    }

}

module.exports = {createTaskController, getAllTasksController, getTaskByIdController, updateTaskController, deleteTaskController}