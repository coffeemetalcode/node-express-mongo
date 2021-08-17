const express = require('express');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid file type');
    if (isValid) {
      error = null;
    }
    callback(error, 'images/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, `${name}-${Date.now()}.${ext}`);
  },
  acl: 'public-read'
});

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
router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imageUrl: `${url}/images/${req.file.filename}`
  });
  console.log('new post: ', post);
  post.save()
    .then((result) => {
      res.status(201).json({
        message: 'new post created',
        post: {
          id: result._id,
          title: result.title,
          content: result.content,
          imageUrl: result.imageUrl
        }
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