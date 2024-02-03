const express = require("express")
const router = new express.Router()

const User = require('../models/user')
const auth = require("../middleware/auth")


/* Users routes */
router.get('/users/me', auth, async (req, res) => {
   res.send(req.user)
})

router.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    }
    catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedKeys = ["name", "password", "email", "age"];
    const updateAllowed = updates.every((updateKey) => allowedKeys.includes(updateKey));
    if (!updateAllowed) {
        return res.status(406).send({
            error: "Invalid operation"
        })
    }
    try {
        const user = req.user
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.status(200).send(user)
    }
    catch (e) {
        res.status(404).send(e);
    }
})

router.delete('/users/me', auth, async (req, res) => {
    await req.user.remove();
    res.send(req.user)
})



module.exports = router