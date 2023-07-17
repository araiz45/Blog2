const express = require('express');
const bodyPaser = require('body-parser');
const _ = require("lodash");

const app = express();

let id = 0;

let posts = [];

app.use(bodyPaser.urlencoded({extended: true}));

app.use('/public/', express.static('./public'));

app.set('view engine', 'ejs');

app.get("/", (req, res) =>{
    // let redContent = posts.content;
    // let finalContent = _.slice(redContent, 0, 100);
    res.render("home", {post: posts});
})

app.get("/about", (req, res) =>{
    res.render("about");
})

app.get("/contact", (req, res) =>{
    res.render("contact");
})

app.get("/compose", (req, res) =>{
    res.render("compose")
})

app.post("/", (req, res) =>{
    let post = req.body;
    post.id = id;
    posts.push(post);
    res.redirect("/");
    id++;
})

app.get("/post/:postName", (req, res) => {
    let  requestFile = req.originalUrl;
    let reqFile = requestFile.slice(6, 7);
    posts.forEach($ =>{
        if(reqFile == $.id){
            res.render("post", {
                title: $.title,
                content: $.content
            })
        }
    })
})

app.listen(3000, () =>{
    console.log("Server has been started");
})