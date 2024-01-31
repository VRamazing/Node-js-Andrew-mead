const express = require("express")
const router = new express.Router()

const Task = require('../models/task')

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }
    catch(e){
        return res.sendStatus(500)
    }
})

router.get('/tasks/:taskId', async (req, res) => {
    const { taskId }  = req.params;
    try {
        const task = await Task.findById(taskId)
        if(!task){
            return res.sendStatus(404);
        }
        res.status(200).send(task)
    }
    catch(e){
        res.sendStatus(500)
    }
})

router.post('/tasks', async (req, res) => {
     const task = new Task(req.body)

     try {
        await task.save();
        res.status(201).send(task)
     }
     catch(e){
        res.sendStatus(400)
     }
 })

 router.patch('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params
    const updates = Object.keys(req.body);
    const allowedKeys = ["description", "completed"];
    const updateAllowed = updates.every((updateKey) => allowedKeys.includes(updateKey));
    if(!updateAllowed){
        return res.status(406).send({
            error: "Invalid operation"
        })
    }

    try{
        const task = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true
        })

        if(!task){
            return res.status(400).send({error: "Task not found"})
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(404).send(e);
    }
})

router.delete('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    try{
        const task = await Task.findByIdAndDelete(taskId)
        if(!task){
            return res.sendStatus(404)
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router