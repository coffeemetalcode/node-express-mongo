const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log('post from the client', post);
  res.status(201).json({
    message: 'new post created'
  });
});

app.get('/api/posts', (req, res, next) => {
  let posts = 
  [
    {
      id: 'abc123',
      title: 'Dummy Server Post',
      content: 'Lorem ipsum, etc.'
    },
    {
      id: 'abc456',
      title: 'Second Dummy Server Post',
      content: 'Lorem ipsum, etc.'
    }
  ];
  res.status(200).json({
    message: 'fecth completed successfully',
    posts: posts
  });
});

module.exports = app;