const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Post = require('./models/post');

const app = express();
dotenv.config()

const dbName = process.env.MONGO_DB_NAME;
const dbUser = process.env.MONGO_DB_USER;
const dbPwd = process.env.MONGO_DB_PWD;

const dbURI = `mongodb+srv://${dbUser}:${dbPwd}@cluster0.vj608.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('database connection initiated');
}).catch(() => {
  console.log('databse connection failed');
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
  next();
});

/* GET posts --> Get all posts */
app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: 'fecth completed successfully',
        posts: documents
      });
    });
});

/* GET post --> Get one post by id */
app.get('/api/posts/:id', (req, res, next) => {
  Post.findById({ _id: req.params.id })
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    });
});

/* POST post --> Add a new post */
app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log('new post: ', post);
  post.save()
    .then((result) => {
      res.status(201).json({
        message: 'new post created',
        id: result._id
      });
    });
    
});

/* PUT post --> Update a post by id */
app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({ _id: req.params.id }, post)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: `post ${req.params.id} has been updated`
      });
    });
});

/* DELETE post --> Delete a post by id */
app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: `post ${req.params.id} deleted`
      });
    });
});

module.exports = app;