const express = require("express")
const router = new express.Router()

const Task = require('../models/task')
const auth = require("../middleware/auth")

router.get('/tasks', auth, async (req, res) => {
    try {
        // await req.user.populate('tasks').execPopulate() - Reverse way
        const tasks = await Task.find({ owner: req.user._id })
        res.status(200).send(tasks)
    }
    catch (e) {
        return res.sendStatus(500)
    }
})

router.get('/tasks/:taskId', auth, async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findOne({ _id: taskId, owner: req.user._id })
        if (!task) {
            return res.sendStatus(404);
        }
        res.status(200).send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:taskId', auth, async (req, res) => {
    const { taskId } = req.params
    const updates = Object.keys(req.body);
    const allowedKeys = ["description", "completed"];
    const updateAllowed = updates.every((updateKey) => allowedKeys.includes(updateKey));
    if (!updateAllowed) {
        return res.status(406).send({
            error: "Invalid operation"
        })
    }

    try {
        const task = await Task.findOne({ _id: taskId, owner: req.user._id });

        if (!task) {
            return res.status(400).send({ error: "Task not found" })
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.status(200).send(task)
    }
    catch (e) {
        res.status(404).send(e);
    }
})

router.delete('/tasks/:taskId', auth, async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findOneAndDelete({ _id: taskId, owner: req.user._id })
        if (!task) {
            return res.sendStatus(404)
        }
        res.status(200).send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router