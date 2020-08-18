const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();

// sudo service mongod start | status | stop | restart
mongoose.connect(
  "mongodb+srv://Admin:medradar@cluster0-zdjph.mongodb.net/MedRadar",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
// json deve vir antes de routes
app.use(express.json());
app.use(routes);

// porta de acesso http://localhost:3333/
app.listen(3332);