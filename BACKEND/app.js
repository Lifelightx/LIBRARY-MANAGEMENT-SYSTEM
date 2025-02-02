const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
const connectToMongo = require('./models/Connection');
connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
