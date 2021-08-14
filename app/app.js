const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const postsRoutes = require('./routes/posts');

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
}).catch((e) => {
  console.log('databse connection failed');
  console.log('error message:', e);
  console.log(
    `Did you forget to run curl ifconfig.me and update your network access list with your machine's current IP?`
  );
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

app.use('/api/posts', postsRoutes);

module.exports = app;