const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// sudo service mongod start | status | stop | restart
mongoose.connect('mongodb://localhost/medradar', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(response => console.log('Conected to Database..'))
.catch(error => console.log('error ->', error.message));
mongoose.Promise = global.Promise;

app.use(cors());
// json deve vir antes de routes
app.use(express.json());
app.use(routes);

// porta de acesso http://localhost:3333/
app.listen(3332);