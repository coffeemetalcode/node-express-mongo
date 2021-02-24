const express = require('express');

const Post = require('../models/post');

const router = express.Router();

/* GET posts --> Get all posts */
router.get('', (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: 'fetch completed successfully',
        posts: documents
      });
    });
});

/* GET post --> Get one post by id */
router.get('/:id', (req, res, next) => {
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
router.post('', (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
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
router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: `post ${req.params.id} deleted`
      });
    });
});

module.exports = router;