const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();

// sudo service mongod start | status | stop | restart
mongoose.connect(
  process.env.MONGODB_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)
.then(response => console.log('Conected to Database..'))
.catch(error => console.log('error ->', error.message));

app.use(cors());
// json deve vir antes de routes
app.use(express.json());
app.use(routes);

// porta de acesso http://localhost:3332/
app.listen(3030);