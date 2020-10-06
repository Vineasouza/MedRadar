const { Router } = require('express');
const multer = require('multer');

const MedController = require('./controllers/Med/controller');
const SearchController = require('./controllers/Search/controller');
const multerConfig = require('./config/multer');

const routes = Router();

routes.get('/', (request, response) => {
    return response.send("API no AR!!");
});

routes.get('/cadastro', MedController.list);
routes.post('/cadastro', multer(multerConfig).single('file'), MedController.create);
routes.delete('/cadastro/:id', MedController.delete);

routes.get("/doutor/:id", MedController.show);
routes.get('/procurar', SearchController.find)
module.exports = routes;