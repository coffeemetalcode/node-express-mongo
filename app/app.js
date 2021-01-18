const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('first response');
  next();
});

app.use((req, res, next) => {
  res.send('Hello from express js');
});

module.exports = app;