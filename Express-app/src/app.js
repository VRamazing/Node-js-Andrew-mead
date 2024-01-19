const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

const port = 3000;

const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.use(express.static(publicPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);



app.get("", (req, res) => {
    res.render("index", {
        title: "Weather app", 
        name: "Veer M"
    });
})


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me", 
        name: "Veer M"
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        help: "Sry we cant help",
        title: "Help", 
        name: "Veer M"
    });
})

app.get("/weather", (req, res) => {
    res.send({forcast: "Its going to rain", temp: "50"});
})

app.get("/help/*", (req, res) => {
    res.render("404Page", {
        title: "Help", 
        name: "Veer M",
        message: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("404Page",  {
        title: "404", 
        name: "Veer M",
        message: "Page not found"
    })
})

app.listen(port, undefined, () => {console.log("Server listening at port:" + port)});