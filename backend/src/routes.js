const { Router } = require('express');

const MedController = require('./controllers/MedController');
const SearchController = require('./controllers/SearchController');
const routes = Router();

routes.get('/', (request, response) => {
    return response.send("API no AR!!");
});

routes.get('/cadastro', MedController.list);
routes.post('/cadastro', MedController.create);

routes.get('/procurar', SearchController.find);

module.exports = routes;