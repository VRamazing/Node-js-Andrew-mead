const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")


const userOneId = new mongoose.Types.ObjectId()
const userOne =  {
    _id: userOneId,
    name: "moti man",
    email: "motievee@example.com",
    password: "Maypass123",
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach(async() => {
    await User.deleteMany()
    await new User(userOne).save()
})

test("Should signup a new user", async () => {
    const response = await request(app).post("/users").send({
        name: "moti veer",
        email: "motievee@gmail.com",
        password: "Maypass123"
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about response 
    expect(response.body).toMatchObject({
        user: {
            name: "moti veer",
            email: "motievee@gmail.com",
        }, 
        token: user.tokens[0].token
    })
    // Password stored in hash check
    expect(user.password).not.toBe("Maypass123")

})

test("Should login existing user", async () => {
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)


    const user = await User.findById(userOne._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test("Should fail login on wrong credentials", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: "wrongpassword"
    }).expect(400)
})


test("Should succeed fetching current user details with credentials", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send().expect(200)
})



test("Should succeed fetching current user details with credentials", async () => {
    await request(app).get("/users/me").send().expect(401)
})



test("Should succeed deleting current user when authenticated", async () => {
    const response = await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send().expect(200)

        
    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})



test("Should fail deleting current user when authenticated", async () => {
    await request(app).delete("/users/me").send().expect(401)
})