const express = require('express')
const mongoose = require("mongoose");

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


mongoose.connect("mongodb://localhost:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

/* Users routes */
app.get('/users', (req, res) => {
    User.find({})
    .then((usrs) => 
        res.status(200).send(usrs))
    .catch(e => res.status(500).send(e))
})

app.get('/users/:userId', (req, res) => {
    const { userId }  = req.params;
   
    User.findById(userId)
    .then((usr) => {
        if(!usr){
            return res.sendStatus(404);
        }
        res.status(200).send(usr)
    })
    .catch(e => res.sendStatus(500))
})


app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({})
    .then((tasks) => 
        res.status(200).send(tasks))
    .catch(e => res.status(500).send(e))
})

app.get('/tasks/:taskId', (req, res) => {
    const { taskId }  = req.params;
   
    Task.findById(taskId)
    .then((task) => {
        if(!task){
            return res.sendStatus(404);
        }
        res.status(200).send(task)
    })
    .catch(e => res.sendStatus(500))
})

 
 
 app.post('/tasks', (req, res) => {
     const task = new Task(req.body)
 
     task.save().then(() => {
         res.status(201).send(task)
     }).catch((e) => {
         res.status(400).send(e)
     })
 })
 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})