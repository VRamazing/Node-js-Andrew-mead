const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model("User", {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// const me = new User({
//     name: "Vignesh",
//     age: 29
// })

// me.save().then(data=>{
//     console.log(data)
// }).catch((error)=>{
//     console.log(error)
// });

const Task = mongoose.model("Task", {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: "Exercise",
    completed: "false"
})

task.save().then(task=> console.log(task)).catch(err => console.log(err))