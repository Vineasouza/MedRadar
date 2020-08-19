const { Router } = require('express');

const MedController = require('./controllers/Med/controller');
const SearchController = require('./controllers/Search/controller');
const routes = Router();

routes.get('/', (request, response) => {
    return response.send("API no AR!!");
});

routes.get('/cadastro', MedController.list);
routes.post('/cadastro', MedController.create);

routes.get('/procurar', SearchController.find);
routes.get('/procurarr', SearchController.findRadius)
module.exports = routes;