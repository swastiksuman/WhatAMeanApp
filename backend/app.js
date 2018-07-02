const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();

mongoose.connect('mongodb+srv://swastik:elnino@cluster0-ufg82.mongodb.net/test?retryWrites=true')
  .then(()=> {
    console.log('Connected to DB');
  }).catch(() => {
    console.log('Cant connect');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false }));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) =>{
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: 'The documents is successfully posted.',
      posts: documents
    });
  }, (err) => {
    console.log(err);
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ id: req.params.id }).then( (result) => {
    res.status(200).json({message: 'Post Deleted'});
  });

});

app.use((req, res, next) =>{
  res.send("Say hello to my little friend");
});

module.exports = app;
