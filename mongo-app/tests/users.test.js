const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user")

const userOne =  {
    name: "moti man",
    email: "motievee@example.com",
    password: "Maypass123"
}

beforeEach(async() => {
    await User.deleteMany()
    await new User(userOne).save()
})

test("Should signup a new user", async () => {
    await request(app).post("/users").send({
        name: "moti veer",
        email: "motievee@gmail.com",
        password: "Maypass123"
    }).expect(201)
})

test("Should login existing user", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test("Should fail login on wrong credentials", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: "wrongpassword"
    }).expect(400)
})