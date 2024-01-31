const express = require("express")
const router = new express.Router()

const User = require('../models/user')

/* Users routes */
router.get('/users', async (req, res) => {
    try{
        const Users = await User.find({})
        res.status(200).send(Users)
    }
    catch(e){
       res.sendStatus(500)
    }
})

router.get('/users/:userId', async (req, res) => {
    const { userId }  = req.params;
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.sendStatus(404);
        }
        res.status(200).send(user)
    }  
    catch(e){
        res.sendStatus(500)
    }
    
})


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        await User.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.patch('/users/:userId', async (req, res) => {
    const { userId } = req.params
    const updates = Object.keys(req.body);
    const allowedKeys = ["name", "password", "email", "age"];
    const updateAllowed = updates.every((updateKey) => allowedKeys.includes(updateKey));
    if(!updateAllowed){
        return res.status(406).send({
            error: "Invalid operation"
        })
    }
    try{
        const user = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true
        })

        if(!user){
            return res.status(400).send({error: "User not found"})
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(404).send(e);
    }
})

router.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    try{
        const user = await User.findByIdAndDelete(userId)
        if(!user){
            return res.sendStatus(404)
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})



module.exports = router