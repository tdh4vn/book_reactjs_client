const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(process.env.PORT || 5000);