const { Router } = require('express');

const MedController = require('./controllers/MedController');
const routes = Router();

routes.get('/', (request, response) => {
    return response.send("API no AR!!");
});

routes.post('/cadastro', MedController.create);

module.exports = routes;