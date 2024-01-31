const express = require('express')
const mongoose = require("mongoose");


const UserRouter = require("./routes/users")
const TaskRouter = require("./routes/tasks")


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(UserRouter);
app.use(TaskRouter);








 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})