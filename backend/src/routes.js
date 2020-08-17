const { Router} = require('express');

const routes = Router();

// GET method route
routes.get('/home', function (req, res) {
    res.json("Hi there, this is a GET method!");
});

// POST method route
routes.post('/home', function (req, res) {
    res.json("Hi there, this is a POST method!");
});

module.exports = routes;